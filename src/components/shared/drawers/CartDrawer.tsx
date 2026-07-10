"use client";

import {ShoppingCart} from "lucide-react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/shadcn/drawer";
import {Button} from "@/components/shadcn/button";
import {cn} from "@/lib/utils";
import CartItem from "@/components/shared/cart/CartItem";
import {TCartItem} from "@/types/types";
import CheckoutButton from "@/components/shared/buttons/CheckoutButton";

export default function CartDrawer({ cartItems }: { cartItems: TCartItem[] }) {
    const totalPrice = cartItems.reduce((acc: number, item: TCartItem) => acc + (Math.round(item.quantity * item.product.price)), 0);

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="p-2 relative text-zinc-600">
                    <ShoppingCart />
                    {cartItems.length > 0 && (
                        <div className="p-1.5 h-5 min-w-5 w-fit text-xs text-white rounded-full bg-red-400 absolute -top-2.5 -right-2.5 flex items-center justify-center">
                            {cartItems.length}
                        </div>
                    )}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">Cart</DrawerTitle>
                    <DrawerDescription className={cn("text-base", cartItems.length === 0 && "text-center")}>
                        {cartItems.length > 0 ? `${cartItems.length} items` : "Your cart is empty"}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex flex-col justify-between h-full px-3">
                    {cartItems.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {cartItems.map((item: TCartItem) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <p className="text-lg font-medium">Total <span className="text-zinc-500">${totalPrice}</span></p>
                    )}
                </div>
                <DrawerFooter>
                    {/*Checkout button to redirect stripe checkout page*/}
                    <CheckoutButton cartItems={cartItems}>
                        Checkout
                    </CheckoutButton>

                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}