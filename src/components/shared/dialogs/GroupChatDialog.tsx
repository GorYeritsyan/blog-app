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

export function GroupChatDialog({ members }: { members?: TUser[] }) {
    const [open, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Chat</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="min-w-120">
                <DialogHeader>
                    <DialogTitle className="text-lg">Create Group Chat</DialogTitle>
                    <DialogDescription className="text-base">Name your group and add members to get started.</DialogDescription>
                </DialogHeader>

                {/*Form*/}
                <GroupChatForm onClose={closeModal} members={members} />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="chat-form" type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
