"use server";

import {fetchInstance} from "@/actions/index";
import {revalidatePath} from "next/cache";
import {TCartItem} from "@/types/types";
import {tryCatch} from "@/utils/utils";

export const getCartItems = async () => {
    const { data } = await tryCatch<TCartItem[]>(fetchInstance("/cart"));

    return data.data;
}

export const incrementCartItemQuantity = async (productId: number) => {
    await fetchInstance(`/cart/items/${productId}/increment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    });

    revalidatePath("/products");
}

export const decrementCartItemQuantity = async (productId: number) => {
    await fetchInstance(`/cart/items/${productId}/decrement`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    });

    revalidatePath("/products");
}

export const removeCartItem = async (productId: number) => {
    await fetchInstance(`/cart/items/${productId}`, {
        method: "DELETE",
    });

    revalidatePath("/products");
}

export const createCheckoutSession = async (cartItems: TCartItem[]) => {
    const { data: session } = await fetchInstance(`/checkout/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems })
    });

    return session;
}

export const getCheckoutSession = async (sessionId: string) => {
    const { data } = await tryCatch(fetchInstance(`/checkout/session/${sessionId}`));

    console.log("Data", data);

    return data?.data;
}