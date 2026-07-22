"use client";

import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/shadcn/table";
import {TProduct} from "@/types/types";
import Image from "next/image";
import ProductDialog from "@/components/shared/dialogs/ProductDialog";
import DeleteDialog from "@/components/shared/dialogs/DeleteDialog";
import {deleteProduct} from "@/actions/products";

const productColumns = ["Image", "Title", "Price", "Actions"];

export default function ProductsTable({ products }: { products: TProduct[] }) {
    const handleDeleteProduct = async (productId: number) => {
        await deleteProduct(productId);
    }

    return (
        <Table className="text-base table-fixed">
            <TableHeader>
                <TableRow>
                    {productColumns.map((column) => (
                        <TableHead className="py-3" key={column}>{column}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.length > 0 ? (
                    products.map(product => (
                        <TableRow key={product.id} className="*:py-3">
                            <TableCell>
                                <Image
                                    src={product?.image ? `http://localhost:8080/uploads/products/${product.image}` : "/macbook.png"}
                                    alt="Product image"
                                    width={56}
                                    height={56}
                                    className="size-14 object-cover rounded border border-zinc-200"
                                />
                            </TableCell>
                            <TableCell>{product?.title}</TableCell>
                            <TableCell className="font-medium">${product.price}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <ProductDialog product={product} />
                                    <DeleteDialog
                                        title="Delete Product"
                                        description="Are you sure you want to delete this product?"
                                        onDelete={() => handleDeleteProduct(product.id)}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="text-center text-zinc-500 w-full py-3" colSpan={productColumns.length}>
                            You haven't created any products yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}