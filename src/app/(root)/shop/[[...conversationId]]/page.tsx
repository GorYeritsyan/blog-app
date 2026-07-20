import Search from "@/components/shared/Search";
import Products from "@/components/shared/products/Products";

export default async function Page({ searchParams, params }: PageProps<"/shop/[[...conversationId]]">) {
    const { query, page = "1" } = await searchParams;
    // const conversationId = (await params).conversationId?.at(-1);

    return (
        <div className="flex flex-col gap-4">
            <Search placeholder="Search for products..." />

            {/* Products */}
            <Products query={query as string} page={+page} />
        </div>
    );
}