"use server";

import {tryCatch} from "@/src/utils/utils";
import {fetchInstance} from "@/src/actions/index";
import {headers} from "next/headers";
import {revalidatePath} from "next/cache";

export const getAllUsers = async ({ query, page }: { query?: string; page: number }) => {
    const limit = 4;

    const searchParams = new URLSearchParams();

    if (query) {
        searchParams.set("query", query);
    } else {
        searchParams.delete("query");
    }

    searchParams.set("page", `${page}`);
    searchParams.set("limit", `${limit}`);

    const { data, error } = await tryCatch(fetchInstance(`/users?${searchParams.toString()}`));
    const { items: users, pagination } = data?.data;

    return { data: users, totalPages: pagination.totalPages };
}

export const sendFriendRequest = async (prevState: any, receiverId: number) => {
    await new Promise(res => setTimeout(res, 3000));

    const { error } = await tryCatch(fetchInstance(`/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId }),
    }));

    if (error) return { message: error.message };

    revalidatePath("/authors");
}