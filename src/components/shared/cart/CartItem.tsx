"use client";

import { TCartItem } from "@/types/types";
import Image from "next/image";
import QuantityStepper from "@/components/shared/products/QuantityStepper";
import {decrementCartItemQuantity, incrementCartItemQuantity} from "@/actions/cart";
import {useTransition} from "react";

export default function CartItem({ item }: { item: TCartItem }) {
    const [isPending, startTransition] = useTransition()

    async function handleIncrement(productId: number) {
        startTransition(async () => {
            await incrementCartItemQuantity(productId);
        });
    }

    async function handleDecrement(productId: number) {
        startTransition(async () => {
            await decrementCartItemQuantity(productId);
        });
    }

    return (
        <div className="flex gap-3 hover:bg-zinc-50 px-3 py-2 rounded-lg">
            <Image src="/macbook.png" alt="cart image" width={40} height={40} className="object-cover" />
            <div className="flex flex-col gap-1">
                <h4 className="text-base font-medium">{item.product.title}</h4>
                <div className="flex items-center gap-2">
                    <QuantityStepper
                        quantity={item.quantity}
                        onIncrement={() => handleIncrement(item.product.id)}
                        onDecrement={() => handleDecrement(item.product.id)}
                        disabled={isPending}
                    />
                    <p className="text-base text-zinc-500">${item.quantity * item.product.price}</p>
                </div>
            </div>
        </div>
    );
}