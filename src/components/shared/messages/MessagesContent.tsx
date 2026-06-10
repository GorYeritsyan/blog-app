"use client";

import {useState} from "react";
import {useInfiniteScroll} from "react-infinite-scroll-component";

import Message from "@/components/shared/messages/Message";
import {TMessage, TUser} from "@/types/types";
import {getMessages} from "@/actions/messages";

export default function MessagesContent({ friendId, messages, currentUser }: { messages: TMessage[]; currentUser: TUser[] }) {
    const [page, setPage] = useState(1);
    const [messagesList, setMessagesList] = useState(messages);
    const [hasMore, setHasMore] = useState(true);
    console.log("list", messagesList);

    async function fetchMessagesHistory() {
        const nextPage = page + 1;
        const { data: messagesHistory, hasNext } = await getMessages(friendId, nextPage);

        if (!hasNext) {
            setHasMore(false);
            return;
        }

        setMessagesList(prev => [...prev, ...messagesHistory]);
        setPage(nextPage);
    }

    const { sentinelRef, isLoading } = useInfiniteScroll({
        next: fetchMessagesHistory,
        hasMore,
        dataLength: messagesList.length,
    });

    return (
        <div id="message-content" className="flex-1 min-h-0 flex flex-col-reverse gap-3 p-6 overflow-y-auto">
            {messagesList.length > 0 ? (
                messagesList.map(message => (
                    <Message key={message.id} message={message} currentUser={currentUser} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}
            <div ref={sentinelRef} aria-hidden={true} />
        </div>
    )
}