"use client";

import Link from "next/link";
import {TRoom} from "@/types/types";
import Chat from "@/components/shared/messages/Chat";

export default function ChatList({ rooms, currentUserId }: { rooms: TRoom[]; currentUserId?: number }) {
    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {rooms.map((room) => (
                <Link href={`/messages/${room.id}`} key={room.id}>
                    <Chat room={room} currentUserId={currentUserId} />
                </Link>
            ))}
        </div>
    );
}