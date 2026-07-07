"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";

import { TCartItem } from "@/types/types";
import QuantityStepper from "@/components/shared/products/QuantityStepper";
import {
    removeCartItem,
    updateCartItemQuantity
} from "@/actions/cart";
import { Button } from "@/components/shadcn/button";

export default function CartItem({ item }: { item: TCartItem }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isPending, startTransition] = useTransition();
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

    const imageUrl = item?.product?.image ? `http://localhost:8080/uploads/products/${item.product.image}` : "/macbook.png"

    async function handleUpdate(newQuantity: number) {
        if (newQuantity < 0) return;

        setQuantity(newQuantity);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            await updateCartItemQuantity(item.productId, newQuantity);
        }, 500);
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
                            quantity={quantity}
                            onIncrement={() => handleUpdate(quantity + 1)}
                            onDecrement={() => handleUpdate(quantity - 1)}
                            disabled={isPending}
                        />
                        <p className="text-base text-zinc-500">${quantity * item.product.price}</p>
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