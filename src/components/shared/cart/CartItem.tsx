"use client";

import { TCartItem } from "@/types/types";
import Image from "next/image";
import QuantityStepper from "@/components/shared/products/QuantityStepper";
import {decrementCartItemQuantity, incrementCartItemQuantity, removeCartItem} from "@/actions/cart";
import {useTransition} from "react";
import {Button} from "@/components/shadcn/button";

export default function CartItem({ item }: { item: TCartItem }) {
    const [isPending, startTransition] = useTransition();
    const imageUrl = item?.product?.image ? `http://localhost:8080/uploads/products/${item.product.image}` : "/macbook.png"

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

    async function handleRemove(productId: number) {
        startTransition(async () => {
            await removeCartItem(productId);
        });
    }

    return (
        <div className="flex items-center gap-3 hover:bg-zinc-50 px-3 py-2 rounded-lg">
            <Image src={imageUrl} alt="cart image" width={40} height={40} className="size-12 object-cover rounded border border-zinc-200" />
            <div className="flex flex-col gap-1 w-full">
                <h4 className="text-base font-medium">{item.product.title}</h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <QuantityStepper
                            quantity={item.quantity}
                            onIncrement={() => handleIncrement(item.product.id)}
                            onDecrement={() => handleDecrement(item.product.id)}
                            disabled={isPending}
                        />
                        <p className="text-base text-zinc-500">${item.quantity * item.product.price}</p>
                    </div>

                    <Button
                        disabled={isPending}
                        onClick={() => handleRemove(item.product.id)}
                        variant="destructive"
                        className="text-sm"
                        size="sm"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}