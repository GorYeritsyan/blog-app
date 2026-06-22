"use client";

import { cn } from "@/lib/utils";
import { useMessages } from "@/providers/MessagesProvider";
import {TRoom} from "@/types/types";

type ChatHeaderProps = {
    chatDetails: TRoom;
    currentUserId: number;
}

export default function ChatHeader({ chatDetails, currentUserId }: ChatHeaderProps) {
    const { onlineUsers } = useMessages();

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

    return (
        <div className="border-b border-b-zinc-200 px-4 py-3 flex flex-col gap-px">
            <h2 className="font-medium">{chatTitle}</h2>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full bg-zinc-300", showOnlineIndicator && "bg-green-500")} />
                {isGroup ? (
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