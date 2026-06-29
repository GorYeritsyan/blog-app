"use client";

import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/shadcn/drawer";
import {Button} from "@/components/shadcn/button";
import {ShoppingCart} from "lucide-react";

export default function CartDrawer() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="p-2 relative text-zinc-600">
                    <ShoppingCart />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">Cart</DrawerTitle>
                    <DrawerDescription className="text-base text-center">Your cart is empty</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Checkout</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}