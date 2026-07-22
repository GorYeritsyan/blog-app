"use client";

import {toast} from "sonner";
import {EllipsisVertical, Trash} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import {Button} from "@/components/shadcn/button";
import DeleteDialog from "@/components/shared/dialogs/DeleteDialog";
import {removeConversation} from "@/actions/conversations";

export default function ChatConversationActions({ conversationId }: { conversationId: number }) {
    const handleDeleteConversation = async () => {
        console.log("conversation deleted", conversationId);

        const error = await removeConversation(conversationId);
        if (error) {
            toast.error(error.message);
            return;
        }

        toast.info("Chat deleted");
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="ghost">
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" className="font-medium cursor-pointer" asChild>
                        <DeleteDialog
                            title="Delete Chat"
                            description="Are you sure you want to delete this chat?"
                            onDelete={handleDeleteConversation}
                            className="w-full text-start flex justify-start items-center gap-1"
                        >
                            <Trash />
                            Delete
                        </DeleteDialog>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}