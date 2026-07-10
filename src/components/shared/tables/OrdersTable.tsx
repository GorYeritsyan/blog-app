import Link from "next/link";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import { TOrder } from "@/types/types";
import { Button } from "@/components/shadcn/button";

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
                {orders.length > 0 ? (
                    orders.map(order => (
                        <TableRow key={order.id} className="*:py-3">
                            <TableCell>{order.id}</TableCell>
                            <TableCell className="text-zinc-600">{format(new Date(order.createdAt), "MMMM d, yyyy, h:mm a")}</TableCell>
                            <TableCell>{order.items.length}</TableCell>
                            <TableCell className="font-medium">${order.total}</TableCell>
                            <TableCell className="font-medium">
                                <Button variant="outline" asChild>
                                    <Link href={`/orders/${order.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="text-center text-zinc-500 w-full py-3" colSpan={orderColumns.length}>
                            You don't have any orders.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}