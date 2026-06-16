import {
    Dialog, DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shadcn/dialog";
import {Button} from "@/components/shadcn/button";
import GroupChatForm from "@/components/shared/forms/GroupChatForm";

export function GroupChatDialog({ members }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Create Chat</Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false} className="max-w-120">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Create Group Chat</DialogTitle>
                        <DialogDescription className="text-base">Name your group and add members to get started.</DialogDescription>
                    </DialogHeader>

                    {/*Form*/}
                    <GroupChatForm members={members} />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
