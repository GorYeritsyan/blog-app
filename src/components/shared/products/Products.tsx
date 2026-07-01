import {getAllProducts} from "@/actions/products";
import { TProduct } from "@/types/types";
import Pagination from "@/components/ui/pagination";
import Product from "@/components/shared/products/Product";
import {getCurrentUser} from "@/actions/auth";

export default async function Products({ query, page }: { query?: string; page: number }) {
    const { data: products, totalPages } = await getAllProducts({ query, page });
    const currentUser = await getCurrentUser();

    return (
        <div className="space-y-4">
            {products.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {products.map((product: TProduct) => (
                        <Product key={product.id} product={product} currentUser={currentUser} />
                    ))}
                </div>
            ) : (
                <p className="text-center font-medium text-zinc-400">No products found</p>
            )}

            {totalPages > 1 && (
                <Pagination totalPages={totalPages} />
            )}
        </div>
    );
}