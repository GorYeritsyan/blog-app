"use client";

import {
    Dialog, DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import {useState} from "react";
import ProductForm from "@/components/shared/forms/ProductForm";
import {TProduct} from "@/types/types";

export default function ProductDialog({ product }: { product?: TProduct }) {
    const [open, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1">
                    {product ? "Edit" : "Create Product"}
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="min-w-120">
                <DialogHeader>
                    <DialogTitle className="text-lg">
                        {product ? "Edit Product" : "Create Product"}
                    </DialogTitle>
                    <DialogDescription className="text-base">Add title and price to list your product.</DialogDescription>
                </DialogHeader>

                {/*Form*/}
                <ProductForm product={product} onClose={closeModal} />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="product-form" type="submit">
                        {product ? "Save" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
