"use client";

import { formatDistanceToNow } from "date-fns";
import Button from "@/src/components/ui/Button";
import {startTransition, useActionState} from "react";
import {acceptFriendRequest} from "@/src/actions/users";

export default function Notification({ notification }) {
    const [state, dispatchAction, isPending] = useActionState(acceptFriendRequest, undefined);

    function handleFollowBack(requestId: number) {
        startTransition(() => {
            dispatchAction(requestId);
        });
    }

    return (
        <div key={notification.id} className="px-4 py-3 hover:bg-zinc-50 flex items-center justify-between gap-3 border-b border-zinc-100">
            <div className="flex flex-col gap-0.5">
                <p className="leading-tight">
                    <span className="font-medium text-zinc-900">{notification?.sender?.name}</span> started following you.
                </p>
                <span className="text-sm text-zinc-500">{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
            </div>

            <Button disabled={isPending} loading={isPending} onClick={() => handleFollowBack(notification.id)} className="h-fit text-sm text-nowrap">
                Follow Back
            </Button>
        </div>
    )
}