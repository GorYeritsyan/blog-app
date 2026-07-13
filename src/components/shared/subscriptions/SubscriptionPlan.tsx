"use client";

import { Button } from "@/components/shadcn/button";
import {TSubscriptionPlan} from "@/types/types";

export default function SubscriptionPlan({ plan }: { plan: TSubscriptionPlan }) {

    const handleSubscription = () => {
        console.log("Subscription Plan handle subscription");
    }

    return (
        <div className="p-4 border border-zinc-200 rounded-xl flex flex-col justify-between gap-2 w-fit min-w-70 min-h-70">
            <h2 className="text-3xl font-semibold">{plan.name}</h2>

            <div className="flex flex-col gap-3">
                <div className="flex items-end gap-1">
                    <span className="font-semibold text-3xl">${plan.price}</span>
                    <span className="text-zinc-500 text-base font-medium">/monthly</span>
                </div>
                <Button size="lg" className="text-base" onClick={handleSubscription}>Subscribe</Button>
            </div>
        </div>
    );
}