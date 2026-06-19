"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Socket} from "socket.io-client";

import {disconnectSocket, getSocket} from "@/socket";

const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!session?.accessToken) return;

        const socket = getSocket(session.accessToken);
        setSocket(socket);

        return () => {
            disconnectSocket();
        }
    }, [session?.accessToken]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};