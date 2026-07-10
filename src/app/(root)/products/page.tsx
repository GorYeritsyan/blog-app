import Search from "@/components/shared/Search";
import Products from "@/components/shared/products/Products";
import ProductDialog from "@/components/shared/dialogs/ProductDialog";
import ProductsTable from "@/components/shared/tables/ProductsTable";
import {getAllProducts, getMyProducts} from "@/actions/products";
import Pagination from "@/components/ui/pagination";

export default async function Page({ searchParams }: PageProps<"/products">) {
    const { query, page = "1" } = await searchParams;
    const { data: products, totalPages } = await getMyProducts({ query: query as string, page: +page });

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-4xl font-semibold">My Products</h1>

                <div>
                    <ProductDialog />
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <Search placeholder="Search for products..." />

                {/* Products */}
                <div className="space-y-4">
                    <ProductsTable products={products} />
                    {totalPages > 1 && (
                        <Pagination totalPages={totalPages} />
                    )}
                </div>
                {/*<Products query={query as string} page={+page} />*/}
            </div>
        </section>
    );
}