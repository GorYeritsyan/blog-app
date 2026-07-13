import OrdersTable from "@/components/shared/tables/OrdersTable";
import Pagination from "@/components/ui/pagination";
import {Button} from "@/components/shadcn/button";

export default function PricingPage() {
    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Subscription Plans</h1>

            {/* Subscription Plans */}
            <div>
                <h2>Pro Plan</h2>
                <span>30$ per month</span>
                <Button>Subscribe</Button>
            </div>
        </section>
    );
}