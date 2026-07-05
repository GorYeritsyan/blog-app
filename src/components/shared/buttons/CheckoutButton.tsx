"use client";

import {ReactNode, useTransition} from "react";
import {Button} from "@/components/shadcn/button";
import { createCheckoutSession } from "@/actions/cart";
import {TCartItem} from "@/types/types";
import {Spinner} from "@/components/shadcn/spinner";
import {toast} from "sonner";

type CheckoutButtonProps = {
    children: ReactNode;
    cartItems: TCartItem[];
}

export default function CheckoutButton({ children, cartItems }: CheckoutButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty. Add an item to continue.");
            return;
        }

        startTransition(async () => {
            try {
                const session = await createCheckoutSession(cartItems);

                if (!session?.url) {
                    toast.error("Something went wrong starting checkout. Please try again.");
                    return;
                }

                window.location.href = session.url;
            } catch (error) {
                toast.error("Checkout failed. Please try again in a moment.");
                console.error("createCheckoutSession error:", error);
            }
        });
    };

    return (
        <Button disabled={isPending || cartItems.length === 0} onClick={handleCheckout}>
            {isPending ? <Spinner /> : children}
        </Button>
    )
}