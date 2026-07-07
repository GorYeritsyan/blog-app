"use server";

import {authFetchInstance, fetchInstance} from "@/actions/index";
import {revalidatePath} from "next/cache";
import {TCartItem} from "@/types/types";
import {tryCatch} from "@/utils/utils";
import {Stripe} from "stripe";

export const getCartItems = async () => {
    const { data } = await tryCatch<TCartItem[]>(authFetchInstance("/cart"));

    return data?.data;
}

export const updateCartItemQuantity = async (productId: number, quantity: number) => {
    await authFetchInstance(`/cart/items/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    revalidatePath("/products");
}

export const removeCartItem = async (productId: number) => {
    await authFetchInstance(`/cart/items/${productId}`, {
        method: "DELETE",
    });

    revalidatePath("/products");
}

export const createCheckoutSession = async (cartItems: TCartItem[]) => {
    const { data: session } = await authFetchInstance<{ data: Stripe.Checkout.Session }>(`/checkout/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems })
    });

    return session;
}

export const getCheckoutSession = async (sessionId: string) => {
    const { data } = await tryCatch(authFetchInstance(`/checkout/session/${sessionId}`));

    console.log("Data", data);

    return data?.data;
}