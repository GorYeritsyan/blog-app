"use client";

import { useEffect, useRef, useState } from "react";

import Message from "@/components/shared/messages/Message";
import { TMessage, TUser } from "@/types/types";
import { getMessages } from "@/actions/messages";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";

type MessageContentProps = {
    friendId: number;
    messages: TMessage[];
    currentUser?: TUser;
}

export default function MessagesContent({ friendId, messages, currentUser }: MessageContentProps) {
    const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const scrollTrigger = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFetching = useRef(false);
    const fetchedPages = useRef(new Set<number>([1]));
    const currentFriendId = useRef(friendId);

    // 👇 Deduplicate and merge messages
    const combined = [...messages, ...history];
    const uniqueMap = new Map();
    combined.forEach(msg => {
        if (msg?.id) uniqueMap.set(msg.id, msg);
    });
    const messagesList = Array.from(uniqueMap.values());

    // Scroll to bottom if there is new messages
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [messages]);

    // 👇 Infinite scroll observer
    useEffect(() => {
        if (typeof window === "undefined" || !window.IntersectionObserver) return;

        const observer = new IntersectionObserver(async (entries) => {
            if (!entries[0].isIntersecting) return;
            if (isFetching.current) return;

            const nextPage = page + 1;
            if (fetchedPages.current.has(nextPage)) return;

            isFetching.current = true;
            fetchedPages.current.add(nextPage);

            try {
                const { data: messagesHistory, hasNext } = await getMessages(
                    currentFriendId.current,
                    nextPage
                );

                if (messagesHistory && messagesHistory.length > 0) {
                    setHistory(prev => [...prev, ...messagesHistory]);
                    setPage(nextPage);
                }
                setHasMore(hasNext);
            } catch (error) {
                console.error(error);
                fetchedPages.current.delete(nextPage);
            } finally {
                isFetching.current = false;
            }
        });

        if (scrollTrigger.current) observer.observe(scrollTrigger.current);
        return () => {
            if (scrollTrigger.current) observer.unobserve(scrollTrigger.current);
        };
    }, [hasMore, page]);

    return (
        <div
            ref={containerRef}
            id="message-content"
            className="flex-1 min-h-0 flex flex-col-reverse gap-3 p-6 overflow-y-auto"
        >
            {messagesList.length > 0 ? (
                messagesList.map(message => (
                    <Message key={message.id} message={message} currentUser={currentUser} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}

            {hasMore && (
                <div
                    ref={scrollTrigger}
                    // className={isFetchingOld ? "[overflow-anchor:auto]" : "[overflow-anchor:none]"}
                >
                    <MessagesSkeleton />
                </div>
            )}
        </div>
    );
}