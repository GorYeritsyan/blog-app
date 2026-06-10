"use server";

import {revalidatePath} from "next/cache";
import {fetchInstance} from "@/actions/index";
import { TMessage} from "@/types/types";
import {tryCatch} from "@/utils/utils";

export const getMessages = async (friendId: number, page?: number) => {
    const { data, error } = await tryCatch<{ items: TMessage[]; totalPages: number }>(fetchInstance(`/messages/${friendId}?page=${page || 1}`));

    const messages = (data?.data?.items && data?.data.items.length > 0) ? data.data.items : [];

    console.log("messages", data);

    return { data: messages, totalPages: data?.data?.pagination, hasNext: data?.data?.hasNext };
}

export const sendMessage = async (prevState: any, payload: { friendId: number, content: string }) => {
    const { friendId, content } = payload;

    await fetchInstance(`/messages/${friendId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });

    revalidatePath(`/messages/${friendId}`);
}