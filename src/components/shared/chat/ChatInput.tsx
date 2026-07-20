"use client";

import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import {sendConversationMessage} from "@/actions/conversations";
import {useState} from "react";

export default function ChatInput() {
    const [content, setContent] = useState("");

    const sendMessage = async () => {
        await sendConversationMessage({ conversationId: 13, content });
        setContent("");
    }
    return (
        <div className="flex gap-2">
            <Input value={content} onChange={e => setContent(e.target.value)} placeholder="Write a message..." />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    );
}