import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/shadcn/table";
import {TOrder} from "@/types/types";
import {Button} from "@/components/shadcn/button";
import {format, isToday} from "date-fns";
import Link from "next/link";

const orderColumns = ["Order ID", "Payment Date", "Items Count", "Total", "Actions"];

export default function OrdersTable({ orders }: { orders: TOrder[] }) {
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
                {orders.map(order => (
                    <TableRow key={order.id} className="*:py-3">
                        <TableCell>{order.id}</TableCell>
                        <TableCell className="text-zinc-600">{format(new Date(order.createdAt), "MMMM d, yyyy, h:mm a")}</TableCell>
                        <TableCell>{order.items.length}</TableCell>
                        <TableCell className="font-medium">${order.total}</TableCell>
                        <TableCell className="font-medium">
                            <Link href={`/orders/${order.id}`}>
                                <Button variant="outline">View Details</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}