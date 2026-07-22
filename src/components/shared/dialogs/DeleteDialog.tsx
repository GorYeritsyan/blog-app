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
import {ReactNode} from "react";
import {cn} from "@/lib/utils";

type DeleteDialogProps = {
    title: string;
    description: string;
    onDelete: () => void;
    children?: ReactNode;
    className?: string;
}

export default function DeleteDialog({ children, title, description, onDelete, className }: DeleteDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={cn(className)}>
                    {children ? children : "Delete"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}