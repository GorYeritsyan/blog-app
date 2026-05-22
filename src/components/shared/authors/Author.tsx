"use client";

import { TUser } from "@/src/types/types";
import Button from "@/src/components/ui/Button";
import {startTransition, useActionState} from "react";
import {sendFriendRequest} from "@/src/actions/users";

// TODO: Handle friend request logic
export default function Author({ author }: { author: TUser }) {

    const [state, dispatchAction, isPending] = useActionState(sendFriendRequest, undefined);

    function followToAuthor(receiverId: number) {
        startTransition(() => {
            dispatchAction(receiverId);
        });
    }

    return (
        <div className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 rounded-md border border-zinc-200">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">{author.name}</h3>
                <span className="text-zinc-500">{author.email}</span>
            </div>

            <Button onClick={() => followToAuthor(author.id)} disabled={isPending}>
                {isPending ? "Loading..." : "Follow"}
            </Button>
        </div>
    );
}