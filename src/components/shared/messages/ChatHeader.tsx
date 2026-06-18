"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ChatHeader({ chatDetails, currentUserId }) {
    const [isOnline, setIsOnline] = useState(false);

    const chatTitle = chatDetails.type === "GROUP" ? chatDetails.name : chatDetails.members.find(member => member.userId !== currentUserId).user.name;

    return (
        <div className="border-b border-b-zinc-200 px-4 py-3 flex flex-col gap-px">
            <h2 className="font-medium">{chatTitle}</h2>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5">
                {chatDetails.type === "GROUP" ? (
                    <span>{chatDetails.members.length} members</span>
                ) : (
                    <>
                        <span className={cn("size-2 rounded-full bg-zinc-300", isOnline && "bg-green-500")} />
                        {isOnline ? "Online" : "Offline"}
                    </>
                )}
            </p>
        </div>
    );
}