"use client";

import {cn} from "@/lib/utils";
import {TRoom} from "@/types/types";
import {usePathname} from "next/navigation";
import MessageDateTime from "@/components/shared/messages/MessageDateTime";
import {useMessages} from "@/providers/MessagesProvider";

export default function Chat({ room, currentUserId }: { room: TRoom; currentUserId?: number }) {
    const pathname = usePathname();
    const roomId = pathname.split("/").at(-1);
    const { onlineUsers } = useMessages();

    const isGroup = room.type === "GROUP";
    const otherMember = room.members?.find(member => member.userId !== currentUserId);

    const chatName = isGroup ? room.name : otherMember?.user?.name;
    const lastMessage = room.messages?.at(0);

    const isOnline = !isGroup && otherMember && onlineUsers?.includes(otherMember.userId);
    const isActiveRoom = typeof roomId !== "undefined" && +roomId === room.id;

    const lastMessagePreview = lastMessage
        ? `${lastMessage.sender.name}: ${lastMessage.content}`
        : "No messages yet";

    const hasOnlineGroupMember = isGroup
        ? room.members?.some(member => member.userId !== currentUserId && onlineUsers?.includes(member.userId))
        : false;

    const showOnlineIndicator = isOnline || hasOnlineGroupMember;

    return (
        <div className={cn("px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col",
            isActiveRoom && "bg-zinc-100"
        )}>
            <div className="flex items-center justify-between">
                <div className="relative">
                    <h4 className="text-lg font-medium">{chatName}</h4>
                    {showOnlineIndicator && (
                        <div className="absolute top-1.5 -right-4 size-2 rounded-full bg-green-500" />
                    )}
                </div>
                <MessageDateTime lastMessage={lastMessage} updatedAt={room.updatedAt} />
            </div>

            <p className="text-zinc-500 truncate text-ellipsis">{lastMessagePreview}</p>
        </div>
    )
}