"use client";

import Message from "@/components/shared/messages/Message";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";
import {TChatMessage, TUser} from "@/types/types";
import {use, useEffect, useRef} from "react";
import ChatMessage from "@/components/shared/chat/ChatMessage";
import {useParams, useSearchParams} from "next/navigation";
import {
    MessageScroller, MessageScrollerButton,
    MessageScrollerContent, MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport
} from "@/components/shadcn/message-scroller";

type ChatMessagesProps = {
    currentUser?: TUser;
    chatMessagesPromise: Promise<TChatMessage[] | undefined>
}

export default function ChatMessages({ chatMessagesPromise, messages }: ChatMessagesProps) {
    // const messages = use(chatMessagesPromise);
    console.log("chat messages", messages);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
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
                <div>
                    <h3>Hi! How can I help?</h3>
                    <p>Ask me anything, I'm here to help.</p>
                {/*<p className="text-zinc-500 text-center">Send message to start conversation</p>*/}
                </div>
            )}
        </div>
        // <MessageScrollerProvider autoScroll>
        //     <MessageScroller>
        //         <MessageScrollerViewport>
        //             <MessageScrollerContent>
        //                 {messages.map((message) => (
        //                     <MessageScrollerItem
        //                         key={message.id}
        //                         messageId={message.id}
        //                         scrollAnchor={message.role.toLowerCase() === "user"}
        //                     >
        //                         <ChatMessage key={message.id} message={message} />
        //                     </MessageScrollerItem>
        //                 ))}
        //             </MessageScrollerContent>
        //         </MessageScrollerViewport>
        //         <MessageScrollerButton />
        //     </MessageScroller>
        // </MessageScrollerProvider>
    );
}