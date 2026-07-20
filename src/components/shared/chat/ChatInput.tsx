"use client";

import { SubmitEvent, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

export default function ChatInput({ onSend, disabled }: { onSend: (content: string) => void; disabled: boolean }) {
    const [content, setContent] = useState("");

    const sendMessage = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (content.trim()) {
            onSend(content);
            setContent("");
        }
    }

    return (
        <form onSubmit={sendMessage} className="flex gap-2">
            <Input value={content} onChange={e => setContent(e.target.value)} placeholder="Write a message..." />
            <Button size="icon" type="submit" disabled={disabled || !content.trim()}>
                <ArrowUp />
            </Button>
        </form>
    );
}