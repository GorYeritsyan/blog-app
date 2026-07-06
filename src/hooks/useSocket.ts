"use client";

import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";

export const useSocket = () => {
    const { data: session, status } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Always tear down any existing socket first (handles logout)
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
        }

        // Only connect when authenticated
        if (status !== "authenticated" || !session?.accessToken) {
            return;
        }

        const socketInstance = io("http://localhost:8080", {
            auth: {
                token: session.accessToken,
            },
            autoConnect: true,
            withCredentials: true,
        });

        socketInstance.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });

        socketRef.current = socketInstance;
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
            socketRef.current = null;
            setSocket(null);
        };
    }, [session, session?.accessToken, status]);

    return socket;
};