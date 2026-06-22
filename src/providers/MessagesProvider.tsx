"use client";

import {createContext, ReactNode, useContext} from "react";
import {useOnlineUsers} from "@/hooks/useOnlineUsers";

type MessagesContextProps = {
    onlineUsers?: number[];
}

const MessagesContext = createContext<MessagesContextProps>({});

export default function MessagesProvider({ children }: { children: ReactNode }) {
    const onlineUsers = useOnlineUsers();
    console.log("online Users", onlineUsers);

    return (
        <MessagesContext.Provider value={{ onlineUsers }}>
            {children}
        </MessagesContext.Provider>
    );
}

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) throw new Error("useMessages must be used within MessagesProvider");

    return context;
}