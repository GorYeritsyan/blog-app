"use client";

import {ReactNode} from "react";
import {Button} from "@/components/shadcn/button";
import { createCheckoutSession } from "@/actions/cart";
import {TCartItem} from "@/types/types";

type CheckoutButtonProps = {
    children: ReactNode;
    cartItems: TCartItem[];
}

export default function CheckoutButton({ children, cartItems }: CheckoutButtonProps) {
    const handleCheckout = async () => {
        const session = await createCheckoutSession(cartItems);
        window.location.href = session.url;
    }

    return (
        <Button onClick={handleCheckout}>
            {children}
        </Button>
    )
}