import {TOrder} from "@/types/types";
import {format} from "date-fns";
import OrderItemsTable from "@/components/shared/tables/OrderItemsTable";

export default function OrderDetails({ order }: { order?: TOrder }) {
    const date = order?.createdAt && format(new Date(order.createdAt), "MMMM d, yyyy, h:mm a");

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl fon-semibold">Order <span className="text-zinc-500">#{order?.id}</span></h2>
                <p className="text-zinc-500 text-lg">Placed {date}</p>
            </div>

            <OrderItemsTable items={order?.items ?? []} total={order?.total} />
        </div>
    );
}