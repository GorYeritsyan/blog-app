import BackButton from "@/components/shared/BackButton";
import OrderDetails from "@/components/shared/orders/OrderDetails";
import {getOrderById} from "@/actions/orders";

export default async function OrderPage({ params }: PageProps<"/orders/[id]">) {
    const { id } = await params;
    const order = await getOrderById(id);

    return (
        <section className="flex items-start gap-10">
            <BackButton />
            <OrderDetails order={order} />
        </section>
    );
}