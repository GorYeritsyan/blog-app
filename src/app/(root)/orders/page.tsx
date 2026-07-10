import OrdersTable from "@/components/shared/tables/OrdersTable";
import Pagination from "@/components/ui/pagination";
import { getAllOrders } from "@/actions/orders";

export default async function OrdersPage({ searchParams }: PageProps<"/orders">) {
    const { query, page = "1" } = await searchParams;
    const { data: orders, totalPages } = await getAllOrders({ query: query as string, page: +page });

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">My Orders</h1>

            {/* Orders Table */}
            <div className="space-y-4">
                <OrdersTable orders={orders} />

                {totalPages > 1 && (
                    <Pagination totalPages={totalPages} />
                )}
            </div>
        </section>
    )
}