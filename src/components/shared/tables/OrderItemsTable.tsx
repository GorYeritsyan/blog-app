import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/shadcn/table";
import { TOrderItem } from "@/types/types";
import Image from "next/image";

const orderColumns = ["Image", "Title", "Quantity", "Price"];

export default function OrderItemsTable({ items, total }: { items: TOrderItem[]; total?: number }) {
    return (
        <Table className="text-base table-fixed">
            <TableHeader>
                <TableRow>
                    {orderColumns.map((column) => (
                        <TableHead className="py-3" key={column}>{column}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(item => (
                    <TableRow key={item.id} className="*:py-3">
                        <TableCell>
                            <Image
                                src={item?.product?.image ? `http://localhost:8080/uploads/products/${item.product.image}` : "/macbook.png"}
                                alt="Product image"
                                width={56}
                                height={56}
                                className="size-14 object-cover rounded border border-zinc-200"
                            />
                        </TableCell>
                        <TableCell>{item.product?.title}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="font-medium">${Math.round(item?.quantity * item.product.price)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="*:py-3">
                    <TableCell colSpan={orderColumns.length - 1}>Total</TableCell>
                    <TableCell>${total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}