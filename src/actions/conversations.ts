"use server";

import {fetchInstance} from "@/actions/index";
import {tryCatch} from "@/utils/utils";
import {TConversation} from "@/types/types";

export const getConversationMessages = async (conversationId: number) => {
    const { data } = await tryCatch<TConversation>(fetchInstance(`/conversations/${conversationId}`));
    return data?.data.messages;
}