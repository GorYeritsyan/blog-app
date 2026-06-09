"use server";

import {fetchInstance} from "@/actions/index";
import { TMessage} from "@/types/types";
import {tryCatch} from "@/utils/utils";
import {revalidatePath} from "next/cache";

export const getMessages = async (friendId: number) => {
    const { data, error } = await tryCatch<TMessage[]>(fetchInstance(`/messages/${friendId}`));

    const messages = (data?.data && data?.data.length > 0) ? data.data : [];

    console.log("messages", data)

    return messages;
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