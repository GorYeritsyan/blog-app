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
import {getCartItems} from "@/actions/cart";
import {cn} from "@/lib/utils";
import CartItem from "@/components/shared/cart/CartItem";
import {TCartItem} from "@/types/types";

export default async function CartDrawer() {
    const cartItems = await getCartItems();
    console.log("cart Items", cartItems);

    const totalPrice = cartItems.reduce((acc: number, item: TCartItem) => acc + (item.quantity * item.product.price), 0);

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

                    <p className="text-lg font-medium">Total <span className="text-zinc-500">${totalPrice}</span></p>
                </div>
                <DrawerFooter>
                    <Button>Checkout</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}