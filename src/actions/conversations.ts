"use server";

import {fetchInstance} from "@/actions/index";
import {tryCatch} from "@/utils/utils";
import {TChatMessage, TConversation} from "@/types/types";
import {revalidatePath, updateTag} from "next/cache";

export const getAllConversations = async () => {
    const { data } = await tryCatch<TConversation[]>(fetchInstance(`/chat/conversations`, {
        next: {
            tags: ["conversations"],
        }
    }));

    return data?.data ?? [];
}

export const getConversationMessages = async (conversationId: number) => {
    const { data } = await tryCatch<TConversation>(fetchInstance(`/chat/conversations/${conversationId}`, {
        next: { tags: [`conversation-${conversationId}`] }
    }));

    return data?.data && data?.data?.messages.length > 0 ? data?.data?.messages : [];
}

export const sendConversationMessage = async ({ conversationId, content }: { conversationId?: number; content: string }) => {
    const { data, error } = await tryCatch<TChatMessage>(fetchInstance(`/chat/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId, content }),
    }));

    updateTag(`conversation-${conversationId}`);
    return { data: data?.data, error };
}

export const removeConversation = async (conversationId: number) => {
    const { error } = await tryCatch(fetchInstance(`/chat/conversations/${conversationId}`, {
        method: "DELETE",
    }));

    updateTag("conversations");
    return error;
}