"use server";

import {fetchInstance} from "@/actions/index";
import {revalidatePath} from "next/cache";
import {TCartItem} from "@/types/types";

export const getCartItems = async () => {
    const { data } = await fetchInstance<{ data: TCartItem[]}>("/cart");

    return data;
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