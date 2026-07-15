import Link from "next/link";
import { CircleX } from "lucide-react";

import { Button } from "@/components/shadcn/button";

export default function SubscriptionCancelPage() {
    return (
        <section className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex flex-col gap-4 border border-zinc-200 px-8 py-8 rounded-xl bg-red-50">
                <div className="flex justify-center items-center gap-3">
                    <CircleX className="text-red-500 size-8" />
                    <h1 className="text-3xl font-semibold">Checkout cancelled</h1>
                </div>
                <p className="text-muted-foreground">
                    No payment was made. You can pick a plan anytime.
                </p>
                <Link href="/pricing">
                    <Button>
                        Back to Pricing
                    </Button>
                </Link>
            </div>
        </section>
    );
}