"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token: string) {
    if (!socket) {
        socket = io("http://localhost:8080", {
            auth: { token },
            autoConnect: true,
            forceNew: true,
            withCredentials: true
        });
    }

    return socket;
}

export function disconnectSocket() {
    socket?.disconnect();
    socket = null;
}