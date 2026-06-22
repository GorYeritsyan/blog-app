"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";

export const useOnlineUsers = () => {
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.on("online_users", setOnlineUsers);

        return () => {
            socket.off("online_users");
        };
    }, [socket]);

    return onlineUsers;
}