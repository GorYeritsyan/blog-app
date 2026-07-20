"use server";

import {fetchInstance} from "@/actions/index";
import {tryCatch} from "@/utils/utils";
import {TConversation} from "@/types/types";
import {revalidatePath, updateTag} from "next/cache";

export const getConversationMessages = async (conversationId: number) => {
    const { data } = await tryCatch<TConversation>(fetchInstance(`/chat/conversations/${conversationId}`, {
        next: { tags: [`conversation-${conversationId}`] }
    }));
    console.log("try catch data", data);
    return data?.data.messages;
}

export const sendConversationMessage = async ({ conversationId, content }: { conversationId: number; content: string }) => {
    await fetchInstance(`/chat/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId, content }),
    });

    updateTag(`conversation-${conversationId}`);
}