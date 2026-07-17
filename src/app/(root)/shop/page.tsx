import Search from "@/components/shared/Search";
import Products from "@/components/shared/products/Products";
import ChatDrawer from "@/components/shared/drawers/ChatDrawer";

export default async function Page({ searchParams }: PageProps<"/products">) {
    const { query, page = "1" } = await searchParams;

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Shop</h1>
                <ChatDrawer />
            </div>

            <div className="flex flex-col gap-4">
                <Search placeholder="Search for products..." />

                {/* Products */}
                <Products query={query as string} page={+page} />
            </div>
        </section>
    );
}