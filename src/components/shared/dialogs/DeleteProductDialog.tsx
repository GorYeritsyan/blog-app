"use client";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/shadcn/alert-dialog";
import { Button } from "@/components/shadcn/button";
import {deleteProduct} from "@/actions/products";

export default function DeleteModalButton({ productId }: { productId: number }) {
    const handleDeleteProduct = async (productId: number) => {
        await deleteProduct(productId);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Delete Product</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">Are you sure you want to delete this product?</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => handleDeleteProduct(productId)}>
                        Yes, I'm sure
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}