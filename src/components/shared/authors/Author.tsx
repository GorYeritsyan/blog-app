"use client";

import { startTransition, useActionState } from "react";

import type { TFriendRequest, TUser } from "@/src/types/types";
import { sendFriendRequest } from "@/src/actions/users";
import Button from "@/src/components/ui/Button";

type AuthorProps = {
    author: TUser;
    sentFriendRequests: TFriendRequest[];
}

export default function Author({ author, sentFriendRequests }: AuthorProps) {
    const [error, dispatchAction, isPending] = useActionState(sendFriendRequest, undefined);

    // Get author status - pending, accepted, rejected
    const authorStatus = sentFriendRequests?.find(request => request.receiverId === author.id)?.status?.toLowerCase();
    const isFollowing = authorStatus === "pending" || authorStatus === "accepted";

    // action to follow author
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

            <Button
                disabled={isPending || isFollowing}
                loading={isPending}
                onClick={() => followToAuthor(author.id)}
                variant={isFollowing ? "outline" : "primary"}
                className="capitalize"
            >
                {isFollowing ? authorStatus : "follow"}
            </Button>
        </div>
    );
}