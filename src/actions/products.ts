"use server";

import {tryCatch} from "@/utils/utils";
import {fetchInstance} from "@/actions/index";
import {revalidatePath} from "next/cache";

export const getAllProducts = async ({ query, page }: { query?: string; page: number }) => {
    const limit = 4;

    const searchParams = new URLSearchParams();

    if (query) {
        searchParams.set("query", query);
    } else {
        searchParams.delete("query");
    }

    searchParams.set("page", `${page}`);
    searchParams.set("limit", `${limit}`);

    const { data, error } = await tryCatch(fetchInstance(`/products?${searchParams.toString()}`));
    const { items: products, pagination } = data?.data;

    return { data: products, totalPages: pagination.totalPages };
}

export const createProduct = async ({ title, price }: { title: string; price: number }) => {
    await fetchInstance("/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, price })
    });

    revalidatePath("/products");
}

export const editProduct = async ({ title, price, productId }: { title: string; price: number; productId: number }) => {
    await fetchInstance(`/products/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, price })
    });

    revalidatePath("/products");
}

export const addToCart = async ({ productId, quantity }: { productId: number; quantity: number }) => {
    await fetchInstance(`/cart/items/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity })
    });

    revalidatePath("/products");
}

export const deleteProduct = async (productId: number) => {
    await fetchInstance(`/products/${productId}`, {
        method: "DELETE",
    });

    revalidatePath("/products");
}