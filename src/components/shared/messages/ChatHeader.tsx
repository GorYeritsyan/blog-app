"use client";

import {useEffect, useState} from "react";
import { cn } from "@/lib/utils";
import {useOnlineUsers} from "@/hooks/useOnlineUsers";

export default function ChatHeader({ chatDetails, currentUserId }) {
    // const [isOnline, setIsOnline] = useState(false);
    const onlineUsers = useOnlineUsers();

    const chatTitle = chatDetails.type === "GROUP" ? chatDetails.name : chatDetails.members.find(member => member.userId !== currentUserId).user.name;
    const isOnline = chatDetails.type === "DM" ? chatDetails.members.find(member => member.userId !== currentUserId && onlineUsers.includes(member.userId)) : false;


    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("user connected");
    //     })
    //
    //     return () => {
    //         socket.off("connect");
    //         socket.disconnect();
    //     }
    // }, []);

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