"use client";

import {ReactNode, useTransition} from "react";
import {toast} from "sonner";
import {Button} from "@/components/shadcn/button";
import {createBillingPortalSession} from "@/actions/subscriptions";

export default function ManageSubscriptionButton({ children }: { children: ReactNode }) {
    const [isPending, startTransition] = useTransition();

    const handleManageSubscription = async () => {
        startTransition(async () => {
            try {
                console.log("Subscription Plan handle subscription");
                const session = await createBillingPortalSession();

                console.log(session);
                if (!session?.url) {
                    toast.error("Something went wrong opening the billing portal. Please try again.");
                    return;
                }

                window.location.href = session?.url;
            } catch (error) {
                toast.error("Couldn't open billing portal. Please try again in a moment.");
                console.error("createBillingPortalSession error:", error);
            }
        });
    }

    return (
        <Button disabled={isPending} onClick={handleManageSubscription} variant="link">
            {children}
        </Button>
    )
}