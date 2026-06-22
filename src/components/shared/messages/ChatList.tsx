"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TRoom } from "@/types/types";
import Chat from "@/components/shared/messages/Chat";
import EmptyChatList from "@/components/empty/EmptyChatList";

export type Tab = "DM" | "GROUP";

const TABS: { label: string; value: Tab }[] = [
    { label: "Direct", value: "DM" },
    { label: "Groups", value: "GROUP" },
];

export default function ChatList({ rooms, currentUserId }: { rooms: TRoom[]; currentUserId?: number }) {
    const [activeTab, setActiveTab] = useState<Tab>("DM");

    const filteredRooms = rooms.filter(room => room.type === activeTab);

    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b border-zinc-200">
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors",
                            activeTab === tab.value && "text-zinc-900 border-b-2 border-zinc-900"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-col overflow-y-auto h-full">
                {filteredRooms.length === 0 ? (
                    <EmptyChatList type={activeTab} />
                ) : (
                    filteredRooms.map(room => (
                        <Link href={`/messages/${room.id}`} key={room.id}>
                            <Chat room={room} currentUserId={currentUserId} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}