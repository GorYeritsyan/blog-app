"use client";

import {startTransition, useActionState, useEffect, useState} from "react";
import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import {sendMessage} from "@/actions/messages";
import {Spinner} from "@/components/shadcn/spinner";
import {Textarea} from "@/components/shadcn/textarea";

export default function MessagesInput({ friendId }: { friendId: number }) {
    const [value, setValue] = useState("");
    const [state, sendMessageAction, isSending] = useActionState(sendMessage, undefined);

    // useEffect(() => {
    //     const content = document.getElementById("message-content");
    //     content.scrollTop = content?.scrollHeight;
    // }, []);

    // scroll to bottom
    function setupScrollObserver(containerSelector) {
        const container = document.querySelector(containerSelector);

        const observer = new MutationObserver(() => {
            container.scrollTop = container.scrollHeight;
        });

        observer.observe(container, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    function handleSendMessage() {
        startTransition(() => {
            sendMessageAction({ friendId, content: value });
        });

        setValue("");

        // scroll to bottom
        setupScrollObserver("#message-content");
    }

    return (
        <div className="w-full min-h-14 border-t border-zinc-200 px-4 py-3 flex items-end">
            <form action={handleSendMessage} className="w-full">
                <div className="flex items-end justify-center gap-2 w-full">
                    <Textarea
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Send message..."
                        className="py-1.5 h-fit text-wrap"
                    />
                    <Button disabled={isSending || !value.trim()} size="lg" className="px-3 text-base min-w-16">
                        {isSending ? <Spinner className="size-5" /> : "Send"}
                    </Button>
                </div>
            </form>
        </div>
    )
}