"use client";

import { Button } from "@/components/shadcn/button";
import {TSubscription, TSubscriptionPlan} from "@/types/types";
import {createSubscriptionCheckoutSession} from "@/actions/subscriptions";
import {toast} from "sonner";
import {useTransition} from "react";
import {Spinner} from "@/components/shadcn/spinner";
import {Badge} from "@/components/shadcn/badge";

export default function SubscriptionPlan({ plan, userSubscription }: { plan: TSubscriptionPlan; userSubscription?: TSubscription }) {
    const [isPending, startTransition] = useTransition();
    const isCurrentPlan = userSubscription?.planId === plan.id;

    const handleSubscription = async () => {
        startTransition(async () => {
            try {
                console.log("Subscription Plan handle subscription");
                const session = await createSubscriptionCheckoutSession(plan);

                console.log(session);
                if (!session?.url) {
                    toast.error("Something went wrong starting checkout. Please try again.");
                    return;
                }

                window.location.href = session?.url;
            } catch (error) {
                toast.error("Checkout failed. Please try again in a moment.");
                console.error("createCheckoutSession error:", error);
            }
        });
    }

    return (
        <div className="p-5 border border-zinc-200 rounded-xl flex flex-col justify-between gap-2 w-full max-w-70 min-h-80">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-semibold">{plan.name}</h2>
                    <Badge>Active</Badge>
                </div>
                <p className="text-zinc-500">{plan.description}</p>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex items-end gap-1">
                    <span className="font-semibold text-4xl">${plan.price}</span>
                    <span className="text-zinc-500 text-base font-medium">/monthly</span>
                </div>
                {isCurrentPlan ? (
                    <Button disabled size="lg" className="text-base" onClick={handleSubscription} variant="outline">
                        {isPending ? <Spinner /> : "Current Plan"}
                    </Button>
                ) : (
                    <Button disabled={isPending} size="lg" className="text-base" onClick={handleSubscription}>
                        {isPending ? <Spinner /> : `Get ${plan.name}`}
                    </Button>
                )}
            </div>
        </div>
    );
}