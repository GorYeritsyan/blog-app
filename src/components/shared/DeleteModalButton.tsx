"use client";

import { deleteBlogPost } from "@/actions/actions";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/shadcn/alert-dialog";
import { Button } from "@/components/shadcn/button";

export default function DeleteModalButton({ postId }: { postId: string }) {
    const handleDeleteBlogPost = async (postId: string) => {
        await deleteBlogPost(postId);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="text-base px-3" size="lg">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Delete Blog Post</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">Are you sure you want to delete this blog post?</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => handleDeleteBlogPost(postId)}>
                        Yes, I'm sure
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}