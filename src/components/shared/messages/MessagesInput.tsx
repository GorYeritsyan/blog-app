"use client";

import {startTransition, useActionState, useState} from "react";
import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import {sendMessage} from "@/actions/messages";
import {Spinner} from "@/components/shadcn/spinner";

export default function MessagesInput({ friendId }: { friendId: number }) {
    const [value, setValue] = useState("");
    const [state, sendMessageAction, isSending] = useActionState(sendMessage, undefined);

    function handleSendMessage() {
        startTransition(() => {
            sendMessageAction({ friendId, content: value })
        });

        setValue("");
    }

    return (
        <div className="w-full min-h-14 border-t border-zinc-200 px-4 py-3 flex items-end">
            <form action={handleSendMessage} className="w-full">
                <div className="flex items-center justify-center gap-2 w-full">
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Send message..."
                        className="py-1.5 h-fit"
                    />
                    <Button disabled={isSending || !value.trim()} size="lg" className="px-3 text-base min-w-16">
                        {isSending ? <Spinner className="size-5" /> : "Send"}
                    </Button>
                </div>
            </form>
        </div>
    )
}