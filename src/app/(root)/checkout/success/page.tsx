import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleCheckBig } from "lucide-react";

import { getCheckoutSession } from "@/actions/cart";
import {Button} from "@/components/shadcn/button";

export default async function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
    const { session_id } = await searchParams;

    if (!session_id || Array.isArray(session_id)) {
        redirect("/products");
    }

    const session = await getCheckoutSession(session_id);

    if (!session) {
        redirect("/checkout/cancel");
    }

    // Stripe session has a payment_status field: "paid" | "unpaid" | "no_payment_required"
    const isPaid = session.payment_status === "paid";

    if (!isPaid) {
        redirect("/checkout/cancel");
    }

    return (
        <section className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex flex-col gap-4 border border-zinc-200 px-8 py-8 rounded-xl bg-green-50">
                <div className="flex justify-center items-center gap-3">
                    <CircleCheckBig className="text-green-500 size-8" />
                    <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
                </div>
                <p className="text-muted-foreground">
                    Your payment was successful.
                </p>
                <Link href="/products">
                    <Button>
                        Continue shopping
                    </Button>
                </Link>
            </div>
        </section>
    );
}