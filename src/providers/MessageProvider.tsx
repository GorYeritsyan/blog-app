"use client";

import {createContext, ReactNode, use, useContext, useEffect, useState} from "react";
import {getMessages} from "@/actions/messages";
import {TMessage} from "@/types/types";

type MessageContextProps = {
    messages: TMessage[];
    incrementPage: () => void;
    hasMore: boolean;
}

const MessageContext = createContext<MessageContextProps | null>(null);

type MessageProviderProps = {
    children: ReactNode;
    messagesPromise: Promise<{ data: TMessage[]; totalPages: number; hasMore: boolean }>;
    friendId: number;
}

export default function MessageProvider({ children, messagesPromise, friendId }: MessageProviderProps) {
    const { data } = use(messagesPromise);
    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState(data);
    const [hasMore, setHasMore] = useState(true);

    const getOldMessages = async () => {

        setPage(page + 1);
        console.log("data", data)

        console.log("fetch more");
    }

    console.log("messages", messages);

    return (
        <MessageContext.Provider value={{ messages, hasMore, getOldMessages }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) throw new Error("useMessages must be used within messages");
    return context;
}