import Message from "@/components/shared/messages/Message";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";
import {TChatMessage, TUser} from "@/types/types";
import {use} from "react";
import ChatMessage from "@/components/shared/chat/ChatMessage";

type ChatMessagesProps = {
    currentUser?: TUser;
    chatMessagesPromise: Promise<TChatMessage[] | undefined>
}

export default function ChatMessages({ currentUser, chatMessagesPromise }: ChatMessagesProps) {
    const messages = use(chatMessagesPromise);

    return (
        <div
            // ref={containerRef}
            id="message-content"
            className="flex-1 min-h-0 h-full flex flex-col-reverse gap-3 p-6 overflow-y-auto"
        >
            {messages && messages.length > 0 ? (
                messages.map(message => (
                    <ChatMessage key={message.id} message={message.content} role={message.role} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}
        </div>
    );
}