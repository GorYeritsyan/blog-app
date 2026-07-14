import {redirect} from "next/navigation";
import SubscriptionPlan from "@/components/shared/subscriptions/SubscriptionPlan";
import {getSubscriptionPlans, getUserSubscription} from "@/actions/subscriptions";
import {getCheckoutSession} from "@/actions/cart";
import {toast} from "sonner";
import {getCurrentUser} from "@/actions/auth";
import {Button} from "@/components/shadcn/button";
import {format} from "date-fns";

export default async function PricingPage({ searchParams }: PageProps<"/pricing">) {
    const { session_id } = await searchParams;
    const plans = await getSubscriptionPlans();
    const userSubscription = await getUserSubscription();

    if (session_id && !Array.isArray(session_id)) {
       const session = await getCheckoutSession(session_id);
       if (!session) toast.error("No payment session found.");

       // toast.success("Thank you! Your subscription is now active.");
       console.log("Thank you! Your subscription is now active.");
       redirect("/pricing");
    }

    console.log("plan", userSubscription?.plan, userSubscription);
    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Subscription Plans</h1>
            {userSubscription && (
                <div className="flex items-center gap-px">
                    <p>
                        You are currently on the <span className="ml-1 font-medium">{`${userSubscription.plan?.name} ($${userSubscription.plan?.price}/mo)`}</span>. Your next renewal date is
                        <span className="ml-1 font-medium">{format(userSubscription?.currentPeriodEnd, "MMMM dd, yyyy")}</span>.
                    </p>
                    <Button variant="link">Manage Billing & Invoices</Button>
                </div>
            )}

            {/* Subscription Plans */}
            <div className="flex gap-3">
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
        </section>
    );
}