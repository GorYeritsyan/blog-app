"use client";

import { useState, useTransition } from "react";
import {TProduct, TUser} from "@/types/types";
import {Button} from "@/components/shadcn/button";
import Image from "next/image";
import {addToCart} from "@/actions/products";
import {Spinner} from "@/components/shadcn/spinner";

export default function Product({ product, currentUser }: { product: TProduct; currentUser?: TUser }) {
    const [quantity, setQuantity] = useState(1);
    // const [] = useActionState(addToCart, undefined);
    const [isPending, startTransition] = useTransition();

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const decrementQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(prev => prev - 1);
    }

    const handleAddToCart = (productId: number) => {
        startTransition(async () => {
            await addToCart({ productId, quantity });
        });
    }

    return (
        <div className="flex flex-col justify-between p-3 gap-3 rounded-lg border border-zinc-200">
            <div className="w-full">
                <Image
                    className="w-full h-60 object-contain"
                    src="/macbook.png"
                    alt="image"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-xl text-zinc-500"><span className="font-medium">${product.price}</span></p>
            </div>

            {product.sellerId === currentUser?.id ? (
                <div className="flex items-center gap-2 w-full justify-center">
                    <Button className="flex-1">Edit</Button>
                    <Button className="flex-1" variant="destructive">Delete</Button>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3">
                        <Button disabled={quantity <= 1} onClick={decrementQuantity} className="flex items-center justify-center text-lg" size="icon-sm" variant="outline">-</Button>
                        <span className="text-lg">{quantity}</span>
                        <Button onClick={incrementQuantity} className="flex items-center justify-center text-lg" size="icon-sm" variant="outline">+</Button>
                    </div>
                    <Button disabled={isPending} onClick={() => handleAddToCart(product.id)}>
                        {isPending ? <Spinner /> : "Add to cart"}
                    </Button>
                </div>
            )}
        </div>
    );
}