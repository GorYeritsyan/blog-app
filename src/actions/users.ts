"use server";

import {cacheLife, cacheTag, revalidatePath, revalidateTag, updateTag} from "next/cache";
import {tryCatch} from "@/utils/utils";
import {authFetchInstance, fetchInstance} from "@/actions/index";
import {TFriendRequest} from "@/types/types";

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

    const { data, error } = await tryCatch(authFetchInstance(`/users?${searchParams.toString()}`));
    const { items: users, pagination } = data?.data;

    return { data: users, totalPages: pagination.totalPages };
}

export const getNotifications = async () => {
    const { data } = await tryCatch<TFriendRequest[]>(authFetchInstance("/friends/incoming", {
        next: { tags: ["notifications"] },
    }));

    return data?.data;
}

export const sendFriendRequest = async (prevState: any, receiverId: number) => {
    const { error } = await tryCatch(authFetchInstance(`/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId }),
    }));

    if (error) return { message: error.message };

    revalidatePath("/authors");
}

export const acceptFriendRequest = async (prevState: any, requestId: number) => {
    await authFetchInstance(`/friends/accept/${requestId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        }
    });

    updateTag("notifications");
}

export const rejectFriendRequest = async (prevState: any, requestId: number) => {
    await authFetchInstance(`/friends/reject/${requestId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        }
    });

    updateTag("notifications");
}

export const removeFriend = async (prevState: any, friendId: number) => {
    await authFetchInstance(`/friends/${friendId}`, {
        method: "DELETE",
    });

    revalidatePath("/authors");
}

export const getFriends = async () => {
    const { data } = await authFetchInstance("/friends/accepted");

    return data;
}

export const getRooms = async () => {
    const { data } = await authFetchInstance("/rooms", { next: { tags: ["rooms"] } });
    return data;
}

export const revalidateRooms = async () => {
    revalidatePath("/messages");
}