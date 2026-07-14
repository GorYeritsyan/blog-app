"use server";

import {fetchInstance} from "@/actions/index";
import {revalidatePath, revalidateTag, updateTag} from "next/cache";
import {TCartItem} from "@/types/types";
import {tryCatch} from "@/utils/utils";
import {Stripe} from "stripe";

export const getCartItems = async () => {
    const { data } = await tryCatch<TCartItem[]>(fetchInstance("/cart", {
        next: {
            tags: ["cart"],
        }
    }));

    return data?.data;
}

export const updateCartItemQuantity = async (productId: number, quantity: number) => {
    await fetchInstance(`/cart/items/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    updateTag("cart");
}

export const removeCartItem = async (productId: number) => {
    await fetchInstance(`/cart/items/${productId}`, {
        method: "DELETE",
    });

    updateTag("cart");
}

export const createCheckoutSession = async (cartItems: TCartItem[]) => {
    const { data: session } = await fetchInstance<{ data: Stripe.Checkout.Session }>(`/checkout/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems })
    });

    return session;
}

export const getCheckoutSession = async (sessionId: string) => {
    const { data } = await tryCatch<Stripe.Checkout.Session>(fetchInstance(`/checkout/session/${sessionId}`));

    return data?.data;
}