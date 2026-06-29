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
import GroupChatForm from "@/components/shared/forms/GroupChatForm";
import { type TUser } from "@/types/types";
import {useState} from "react";
import ProductForm from "@/components/shared/forms/ProductForm";

export function ProductDialog() {
    const [open, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Product</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="min-w-120">
                <DialogHeader>
                    <DialogTitle className="text-lg">Create Product</DialogTitle>
                    <DialogDescription className="text-base">Add title and price to list your product.</DialogDescription>
                </DialogHeader>

                {/*Form*/}
                <ProductForm onClose={closeModal} />
                {/*<GroupChatForm onClose={closeModal} members={members} />*/}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="product-form" type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
