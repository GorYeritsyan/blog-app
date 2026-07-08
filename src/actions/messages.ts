"use server";

import {revalidatePath} from "next/cache";
import {fetchInstance} from "@/actions/index";
import {TMessage, TPagination} from "@/types/types";
import {tryCatch} from "@/utils/utils";
import {toast} from "sonner";
import {redirect} from "next/navigation";

export const getMessages = async (friendId: number, page?: number) => {
    const { data } = await tryCatch<{ items: TMessage[]; pagination: TPagination }>(fetchInstance(`/messages/${friendId}?page=${page || 1}`));

    const messages = (data?.data?.items && data?.data.items.length > 0) ? data.data.items : [];

    return { data: messages, totalPages: data?.data?.pagination?.totalPages, hasNext: data?.data?.pagination?.hasNext };
}

export const createGroupChat = async ({ name, memberIds }: { name: string; memberIds: number[] }) => {
    await fetchInstance("/rooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, memberIds })
    });

    revalidatePath("/messages");
}

export const getChatById = async (roomId: number) => {
    const { data, error } = await tryCatch(fetchInstance(`/rooms/${roomId}`));

    if (error) {
        toast.error(error.message);
        redirect("/messages");
    }

    return data.data;
}