"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children, token }: { children: ReactNode; token: string }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!token || socket) return;

        const socketInstance = io("http://localhost:8080", {
            auth: { token },
            autoConnect: true,
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 2000,
        });

        socketInstance.on("connect", () => console.log("Socket connected"));
        socketInstance.on("connect_error", (err) => console.error("Socket error:", err.message));

        // socketRef.current = socketInstance;
        setSocket(socketInstance);

        return () => {
            socketInstance.off("connect");
            socketInstance.off("connect_error");
            socketInstance.disconnect();
            // socketRef.current = null;
            setSocket(null);
        };
    }, [token]);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};