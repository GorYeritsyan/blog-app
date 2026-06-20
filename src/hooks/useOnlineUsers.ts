"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";

export const useOnlineUsers = () => {
    console.log("useOnlineUsers useOnlineUsers");
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.on("online_users", setOnlineUsers);

        return () => {
            socket.off("online_users", setOnlineUsers);
        };
    }, [socket]);

    return onlineUsers;
}