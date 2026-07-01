import Search from "@/components/shared/Search";
import Products from "@/components/shared/products/Products";
import ProductDialog from "@/components/shared/dialogs/ProductDialog";
import {getCheckoutSession} from "@/actions/cart";

export default async function Page({ searchParams }: PageProps<"/products">) {
    const { query, page = "1", session_id } = await searchParams;

    const session = await getCheckoutSession(session_id as string);
    console.log("session_id", session);

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-4xl font-semibold">Shop</h1>

                <div>
                    <ProductDialog />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Search placeholder="Search for products..." />

                {/* Products */}
                <Products query={query as string} page={+page} />
            </div>
        </section>
    );
}