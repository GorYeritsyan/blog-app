import OrdersTable from "@/components/shared/tables/OrdersTable";
import Pagination from "@/components/ui/pagination";
import {Button} from "@/components/shadcn/button";
import SubscriptionPlan from "@/components/shared/subscriptions/SubscriptionPlan";

const plans = [
    {
        name: "Pro Plan",
        price: 30
    }
];

export default function PricingPage() {
    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Subscription Plans</h1>

            {/* Subscription Plans */}
            <div className="flex gap-3">
                {plans.map(plan => (
                    <SubscriptionPlan plan={plan} />
                ))}
            </div>
        </section>
    );
}