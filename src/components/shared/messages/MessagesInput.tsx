"use client";

import {SubmitEvent, useRef, useState} from "react";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import { Textarea } from "@/components/shadcn/textarea";
import { useSocket } from "@/providers/SocketProvider";
import {TUser} from "@/types/types";

export default function MessagesInput({ roomId, currentUser }: { roomId: number; currentUser?: TUser; }) {
    const socket = useSocket();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const [isTyping, setIsTyping] = useState(false);

    const [value, setValue] = useState("");
    const [isSending, setIsSending] = useState(false);

    function handleSendMessage(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsSending(true);

        // Stop real time typing indicator
        socket?.emit("typing", { roomId: String(roomId), user: currentUser?.name, isTyping: false });

        // Trigger message web socket event
        socket?.emit("message", { roomId: String(roomId), content: value }, async () => {
            setIsSending(false);
            // await revalidateRooms();
        });
        setValue("");
    }

    function handleInputChange(value: string) {
        setValue(value);

        if (!isTyping) {
            socket?.emit("typing", { roomId: String(roomId), user: currentUser?.name, isTyping: true });
            setIsTyping(true);
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            socket?.emit("typing", { roomId: String(roomId), user: currentUser?.name, isTyping: false });
            setIsTyping(false);
        }, 1000);
    }

    return (
        <div className="relative w-full min-h-14 border-t border-zinc-200 px-4 py-3 flex items-end">
            <form onSubmit={handleSendMessage} className="w-full">
                <div className="flex items-end justify-center gap-2 w-full">
                    <Textarea
                        value={value}
                        onChange={e => handleInputChange(e.target.value)}
                        placeholder="Send message..."
                        className="py-1.5 h-fit text-wrap min-h-fit"
                    />
                    <Button disabled={isSending || !value.trim()} size="lg" className="px-3 text-base min-w-16">
                        {isSending ? <Spinner className="size-5" /> : "Send"}
                    </Button>
                </div>
            </form>
        </div>
    )
}