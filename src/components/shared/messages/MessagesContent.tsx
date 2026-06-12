"use client";

import {useEffect, useRef, useState} from "react";

import Message from "@/components/shared/messages/Message";
import {TMessage, TUser} from "@/types/types";
import {getMessages} from "@/actions/messages";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";

type MessageContentProps = {
    friendId: number;
    messages: TMessage[];
    currentUser?: TUser;
}

export default function MessagesContent({ friendId, messages, currentUser }: MessageContentProps) {
    const [page, setPage] = useState(1);
    const [history , setHistory] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const scrollTrigger = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null); // 👈 Add container ref
    const isFetching = useRef(false);       // guard against concurrent/duplicate fetches
    const fetchedPages = useRef(new Set<number>([1])); // page 1 already in `messages` prop

    // 💡 FIX: Keep friendId tracked in a ref to keep observer closures stable
    const currentFriendId = useRef(friendId);

    useEffect(() => {
        currentFriendId.current = friendId;
        // Reset states if friend switches
        setPage(1);
        setHistory([]);
        setHasMore(true);
        fetchedPages.current = new Set<number>([1]);
    }, [friendId]);

    // 💡 FIX: Merge arrays and strictly deduplicate items by ID to absorb DB index shifts
    const combined = [...messages, ...history];
    const uniqueMap = new Map();
    combined.forEach(msg => {
        if (msg?.id) uniqueMap.set(msg.id, msg);
    });
    const messagesList = Array.from(uniqueMap.values());

    useEffect(() => {
        if (typeof window === "undefined" || !window.IntersectionObserver) return;

        const observer = new IntersectionObserver(async (entries) => {
            if (!entries[0].isIntersecting) return;
            if (isFetching.current) return;  // already loading

            const container = containerRef.current;

            // 👇 Snapshot scroll position BEFORE fetching
            const prevScrollHeight = container?.scrollHeight ?? 0;

            const nextPage = page + 1;

            if (fetchedPages.current.has(nextPage)) return; // already fetched this page

            isFetching.current = true;
            fetchedPages.current.add(nextPage);

            try {
                const { data: messagesHistory, hasNext } = await getMessages(currentFriendId.current, nextPage);

                if (messagesHistory && messagesHistory.length > 0) {
                    setHistory(prev => [...prev, ...messagesHistory]);
                    setPage(nextPage);
                }
                setHasMore(hasNext);

                // 👇 Restore scroll position AFTER DOM updates
                requestAnimationFrame(() => {
                    if (container) {
                        const newScrollHeight = container.scrollHeight;
                        container.scrollTop = (container.scrollTop + (newScrollHeight - prevScrollHeight));
                    }
                });
            } catch (error) {
                console.error(error);
                fetchedPages.current.delete(nextPage);
            } finally {
                // Micro-timeout prevents rapid scroll re-triggers
                isFetching.current = false;
            }
        });

        if (scrollTrigger.current) {
            observer.observe(scrollTrigger.current);
        }

        return () => {
            if (scrollTrigger.current) {
                observer.unobserve(scrollTrigger.current);
            }
        };
    }, [hasMore, page]);

    // UI structure and elements left entirely untouched:
    return (
        <div ref={containerRef} id="message-content" className="flex-1 min-h-0 flex flex-col-reverse gap-3 p-6 overflow-y-auto">
            {messagesList.length > 0 ? (
                messagesList.map(message => (
                    <Message key={message.id} message={message} currentUser={currentUser} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}
            {/*<div ref={sentinelRef} aria-hidden={true} />*/}

            {hasMore &&  (
                <div ref={scrollTrigger}>
                    <MessagesSkeleton />
                </div>
            )}
        </div>
    )
}