import Link from "next/link";
import {Button} from "@/components/shadcn/button";

export default function CheckoutCancelPage() {
    return (
        <section className="flex flex-col items-center gap-4 py-16 text-center">
            <h1 className="text-3xl font-semibold">Checkout cancelled</h1>
            <p className="text-muted-foreground">
                No payment was made. Your cart is still saved if you'd like to try again.
            </p>
            <Link href="/products">
                <Button>
                    Back to shop
                </Button>
            </Link>
        </section>
    );
}