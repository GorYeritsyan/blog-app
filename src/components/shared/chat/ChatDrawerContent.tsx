"use client";

import ChatMessages from "@/components/shared/chat/ChatMessages";
import {TChatMessage} from "@/types/types";
import {getConversationMessages} from "@/actions/conversations";
import {use} from "react";

export default function ChatDrawerContent({ conversationId, messagesPromise }: { conversationId?: string }) {
    // let messages: TChatMessage[] = [];
    //
    // if (conversationId) {
    //     messages = await getConversationMessages(+conversationId);
    // }

    const messages = use(messagesPromise);

    return (
        <ChatMessages
            messages={messages ?? []}
        />
    );
}