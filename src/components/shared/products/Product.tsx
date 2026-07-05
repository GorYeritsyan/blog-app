"use client";

import { useState, useTransition } from "react";
import {TProduct, TUser} from "@/types/types";
import {Button} from "@/components/shadcn/button";
import Image from "next/image";
import {addToCart} from "@/actions/products";
import {Spinner} from "@/components/shadcn/spinner";
import DeleteProductDialog from "@/components/shared/dialogs/DeleteProductDialog"
import ProductDialog from "@/components/shared/dialogs/ProductDialog";
import QuantityStepper from "@/components/shared/products/QuantityStepper";

export default function Product({ product, currentUser }: { product: TProduct; currentUser?: TUser }) {
    const [quantity, setQuantity] = useState(1);
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
            <Image
                className="size-68 object-cover rounded-md border self-center"
                src={product.image ? `http://localhost:8080/uploads/products/${product.image}` : "/macbook.png"}
                alt="image"
                width={272}
                height={272}
            />
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-xl text-zinc-500"><span className="font-medium">${quantity * product.price}</span></p>
            </div>

            {product.sellerId === currentUser?.id ? (
                <div className="flex items-center gap-2 w-full justify-center">
                    {/*<Button className="flex-1">Edit</Button>*/}
                    <ProductDialog product={product} />
                    <DeleteProductDialog productId={product.id} />
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    <QuantityStepper
                        quantity={quantity}
                        onIncrement={incrementQuantity}
                        onDecrement={decrementQuantity}
                    />
                    <Button disabled={isPending} onClick={() => handleAddToCart(product.id)}>
                        {isPending ? <Spinner /> : "Add to cart"}
                    </Button>
                </div>
            )}
        </div>
    );
}