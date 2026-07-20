"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { sendConversationMessage } from "@/actions/conversations";
import {useParams, useRouter} from "next/navigation";

export default function ChatInput({ onSend }) {
    const params = useParams();
    const router = useRouter();
    const [content, setContent] = useState("");

    const conversationId = params?.conversationId?.at(-1);
    const isNewChat = !conversationId;

    const sendMessage = async () => {
        // const assistanceMessage = await sendConversationMessage({ conversationId: +conversationId, content });
        //
        // if (isNewChat && assistanceMessage) {
        //     router.push(`/shop/conversations/${assistanceMessage.conversationId}`);
        // }
        onSend(content);
        setContent("");
    }

    return (
        <div className="flex gap-2">
            <Input value={content} onChange={e => setContent(e.target.value)} placeholder="Write a message..." />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    );
}