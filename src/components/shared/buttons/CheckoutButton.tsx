"use client";

import {ReactNode, useTransition} from "react";
import {Button} from "@/components/shadcn/button";
import { createCheckoutSession } from "@/actions/cart";
import {TCartItem} from "@/types/types";
import {Spinner} from "@/components/shadcn/spinner";

type CheckoutButtonProps = {
    children: ReactNode;
    cartItems: TCartItem[];
}

export default function CheckoutButton({ children, cartItems }: CheckoutButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleCheckout = async () => {
        startTransition(async () => {
            const session = await createCheckoutSession(cartItems);
            console.log("session", session);
            window.location.href = session.url;
        });
    }

    return (
        <Button disabled={isPending} onClick={handleCheckout}>
            {isPending ? <Spinner /> : children}
        </Button>
    )
}