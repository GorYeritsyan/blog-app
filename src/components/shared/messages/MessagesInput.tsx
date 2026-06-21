"use client";

import { SubmitEvent, useState} from "react";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import { Textarea } from "@/components/shadcn/textarea";
import { useSocket } from "@/providers/SocketProvider";

export default function MessagesInput({ roomId }: { roomId: number }) {
    const socket = useSocket();
    const [value, setValue] = useState("");
    const [isSending, setIsSending] = useState(false);

    function handleSendMessage(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsSending(true);

        // Trigger message web socket event
        socket?.emit("message", { roomId, content: value }, () => setIsSending(false));
        setValue("");
    }

    return (
        <div className="w-full min-h-14 border-t border-zinc-200 px-4 py-3 flex items-end">
            <form onSubmit={handleSendMessage} className="w-full">
                <div className="flex items-end justify-center gap-2 w-full">
                    <Textarea
                        value={value}
                        onChange={e => setValue(e.target.value)}
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