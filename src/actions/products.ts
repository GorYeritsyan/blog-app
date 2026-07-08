"use server";

import {revalidatePath} from "next/cache";
import {tryCatch} from "@/utils/utils";
import { fetchInstance } from "@/actions/index";
import {TPagination, TProduct} from "@/types/types";

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

    const { data, error } = await tryCatch<{ items: TProduct[]; pagination: TPagination }>(fetchInstance(`/products?${searchParams.toString()}`));
    const { items: products, pagination } = data?.data as { items: TProduct[]; pagination: TPagination };

    return { data: products, totalPages: pagination.totalPages };
}

export const createProduct = async (formData: FormData) => {
    await fetchInstance("/products", {
        method: "POST",
        body: formData,
    });

    revalidatePath("/products");
}

export const editProduct = async (productId: number, formData: FormData) => {
    await fetchInstance(`/products/${productId}`, {
        method: "PUT",
        body: formData,
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