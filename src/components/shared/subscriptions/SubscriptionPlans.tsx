"use client";

import SubscriptionPlan from "@/components/shared/subscriptions/SubscriptionPlan";
import {TSubscription, TSubscriptionPlan} from "@/types/types";

type SubscriptionPlansProps = {
    plans?: TSubscriptionPlan[];
    userSubscription?: TSubscription;
}

export default function SubscriptionPlans({ plans, userSubscription }: SubscriptionPlansProps) {
    return (
        <div className="flex justify-center gap-8">
            {plans && plans.length > 0 ? (
                plans.map(plan => (
                    <SubscriptionPlan key={plan.id} plan={plan} userSubscription={userSubscription} />
                ))
            ) : (
                <div className="flex justify-center w-full">
                    <p className="text-zinc-500">No plans available right now.</p>
                </div>
            )}
        </div>
    );
}