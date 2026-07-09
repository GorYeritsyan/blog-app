"use server";

import {fetchInstance} from "@/actions/index";
import {tryCatch} from "@/utils/utils";
import {TOrder, TPagination, TUser} from "@/types/types";

export const getAllOrders = async ({ query, page }: { query?: string; page: number }) => {
    const limit = 4;

    const searchParams = new URLSearchParams();

    if (query) {
        searchParams.set("query", query);
    } else {
        searchParams.delete("query");
    }

    searchParams.set("page", `${page}`);
    searchParams.set("limit", `${limit}`);

    const { data, error } = await tryCatch<{ items: TOrder[]; pagination: TPagination }>(fetchInstance(`/orders?${searchParams.toString()}`));

    const { items: orders, pagination } = data?.data as { items: TOrder[]; pagination: TPagination };

    return { data: orders, totalPages: pagination.totalPages };
}

export const getOrderById = async (id: string) => {
    const { data } = await tryCatch<TOrder>(fetchInstance(`/orders/${id}`));

    return data?.data;
}