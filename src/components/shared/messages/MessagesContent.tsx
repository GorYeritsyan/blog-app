"use client";

import {use, useEffect, useRef, useState} from "react";

import Message from "@/components/shared/messages/Message";
import { TMessage, TUser } from "@/types/types";
import { getMessages } from "@/actions/messages";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";
import {useSocket} from "@/providers/SocketProvider";

type MessageContentProps = {
    roomId: number;
    messagesPromise: Promise<{ data: TMessage[]; totalPages: number; hasNext: boolean }>;
    currentUser?: TUser;
}

export default function MessagesContent({ roomId, messagesPromise, currentUser }: MessageContentProps) {
    const socket = useSocket();
    const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);
    const scrollTrigger = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFetching = useRef(false);
    const fetchedPages = useRef(new Set<number>([1]));
    const { data: messages, hasNext } = use(messagesPromise);

    const [socketMessages, setSocketMessages] = useState([]);

    const [hasMore, setHasMore] = useState(hasNext);

    // Deduplicate and merge messages
    const combined = [...socketMessages, ...messages, ...history];
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

    // Infinite scroll observer
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
                    roomId,
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

    useEffect(() => {
        if (!socket) return;

        console.log("room id", roomId);
        socket.emit("join_room", String(roomId));

        return () => {
            socket.emit("leave_room", String(roomId));
        }
    }, [roomId, socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on("message", (sentMessage) => {
            console.log("sent message", sentMessage)
            setSocketMessages(prev => [sentMessage, ...prev]);
        });

        return () => {
            socket.off("message")
        }
    }, [socket]);

    return (
        <div
            ref={containerRef}
            id="message-content"
            className="flex-1 min-h-0 h-full flex flex-col-reverse gap-3 p-6 overflow-y-auto"
        >
            {messagesList.length > 0 ? (
                messagesList.map(message => (
                    <Message key={message.id} message={message} currentUser={currentUser} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}

            {hasMore && messagesList.length > 0 && (
                <div
                    ref={scrollTrigger}
                    // className={isFetchingOld ? "[overflow-anchor:auto]" : "[overflow-anchor:none]"}
                >
                    {/*<div className="flex justify-center items-center p-3">*/}
                    {/*    <Spinner className="size-6" />*/}
                    {/*</div>*/}
                    <MessagesSkeleton />
                </div>
            )}
        </div>
    );
}