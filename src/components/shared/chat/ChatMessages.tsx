"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "@/components/shared/chat/ChatMessage";
import {TChatMessage, TUser} from "@/types/types";
import {Marker, MarkerContent, MarkerIcon} from "@/components/shadcn/marker";
import {Spinner} from "@/components/shadcn/spinner";

type ChatMessagesProps = {
    chatMessagesPromise: Promise<TChatMessage[] | undefined>;
    messages: TChatMessage[];
    isThinking: boolean;
}

export default function ChatMessages({ chatMessagesPromise, messages, isThinking }: ChatMessagesProps) {
    // const messages = use(chatMessagesPromise);
    console.log("chat messages", messages);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && messages.at(-1)?.role.toLowerCase() === "user") {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={containerRef}
            id="message-content"
            className="flex-1 min-h-0 h-full flex flex-col gap-4 p-6 overflow-y-auto"
        >
            {messages && messages.length > 0 ? (
                messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))
            ) : (
                <p className="text-zinc-700 text-base text-center">How can I help you today?</p>
            )}

            {isThinking && (
                <Marker role="status">
                    <MarkerIcon>
                        <Spinner />
                    </MarkerIcon>
                    <MarkerContent className="shimmer">Thinking...</MarkerContent>
                </Marker>
            )}
        </div>
    );
}