import {getSubscriptionPlans, getUserSubscription} from "@/actions/subscriptions";
import SubscriptionPlans from "@/components/shared/subscriptions/SubscriptionPlans";
import SubscriptionMessage from "@/components/shared/subscriptions/SubscriptionMessage";

export default async function PricingPage() {
    const plans = await getSubscriptionPlans();
    const userSubscription = await getUserSubscription();

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Subscription Plans</h1>
            {userSubscription && (
                <SubscriptionMessage userSubscription={userSubscription} />
            )}

            {/* Subscription Plans */}
            <SubscriptionPlans plans={plans} userSubscription={userSubscription} />
        </section>
    );
}