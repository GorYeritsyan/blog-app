"use server";

import {tryCatch} from "@/utils/utils";
import {fetchInstance} from "@/actions/index";
import {TSubscription, TSubscriptionPlan} from "@/types/types";
import {Stripe} from "stripe";

export const getSubscriptionPlans = async () => {
    const { data } = await tryCatch<TSubscriptionPlan[]>(fetchInstance("/plans"));

    return data?.data;
}

export const createSubscriptionCheckoutSession = async (plan: TSubscriptionPlan) => {
    const { data } = await tryCatch<Stripe.Checkout.Session>(fetchInstance("/checkout/session/subscription", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan })
    }));
    console.log("session", data?.data);

    return data?.data;
}

export const getUserSubscription = async () => {
   const { data } = await tryCatch<TSubscription>(fetchInstance("/subscriptions/me"));

   return data?.data;
}