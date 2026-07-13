"use client";

import { useEffect, useState } from "react";
import { useMessages } from "@/providers/MessagesProvider";
import { useSocket } from "@/providers/SocketProvider";
import { cn } from "@/lib/utils";
import { type TRoom } from "@/types/types";

type ChatHeaderProps = {
    chatDetails: TRoom;
    currentUserId?: number;
}

export default function ChatHeader({ chatDetails, currentUserId }: ChatHeaderProps) {
    const { onlineUsers } = useMessages();
    const socket = useSocket();
    const [typers, setTypers] = useState(new Map());

    const isGroup = chatDetails.type === "GROUP";
    const otherMembers = chatDetails?.members?.filter((member) => member.userId !== currentUserId);

    const chatTitle = isGroup
        ? chatDetails.name
        : otherMembers?.[0]?.user?.name;

    const isOnline = !isGroup && otherMembers && onlineUsers?.includes(otherMembers[0]?.userId);

    const onlineMembersCount = isGroup && otherMembers
        ? otherMembers.filter(member => onlineUsers?.includes(member.userId)).length
        : 0;

    const showOnlineIndicator = isOnline || onlineMembersCount > 0;

    // Generate typing preview, example: user is typing, user1 and user2 are typing, etc.
    function generateTypingPreview(typers: Map<number, string>) {
        const names = [...typers.values()];

        if (names.length === 0) return "";
        if (names.length > 3) return `${names.length} people are typing...`;
        if (names.length > 1) return `${names.join(", ")} are typing...`;
        return `${names[0]} is typing...`;
    }

    const typingPreview = generateTypingPreview(typers);

    // Effect to show typing indicator in real time
    useEffect(() => {
        if (!socket) return;

        socket.on("typing", ({ user, userId, isTyping }) => {
            setTypers(prev => {
                const next = new Map(prev);

                // Add new typer or remove from typers list
                if (isTyping) {
                    next.set(userId, user);
                } else {
                    next.delete(userId);
                }

                return next;
            });
        });

        return () => {
            socket.off("typing");
        };
    }, [socket]);

    return (
        <div className="border-b border-b-zinc-200 px-4 py-3 flex flex-col gap-px">
            <h2 className="font-medium">{chatTitle}</h2>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full bg-zinc-300", showOnlineIndicator && "bg-green-500")} />

                {typingPreview ? (
                    <span>{typingPreview}</span>
                ) : isGroup ? (
                    <>
                        <span>{chatDetails.members?.length} members</span>
                        {onlineMembersCount > 0 && (
                            <span>• {onlineMembersCount} online</span>
                        )}
                    </>
                ) : (
                    <span>{isOnline ? "Online" : "Offline"}</span>
                )}
            </p>
        </div>
    );
}