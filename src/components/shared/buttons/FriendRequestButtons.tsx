"use client";

import { startTransition, useActionState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "@/actions/users";
import {Button} from "@/components/shadcn/button";
import {Spinner} from "@/components/shadcn/spinner";

export default function FriendRequestButtons({ requestId }: { requestId: number }) {
    const [acceptError, acceptAction, isAccepting] = useActionState(acceptFriendRequest, undefined);
    const [declineError, declineAction, isDeclining] = useActionState(rejectFriendRequest, undefined)

    function handleAccept(requestId: number) {
        startTransition(() => {
            acceptAction(requestId);
        });
    }

    function handleDecline(requestId: number) {
        startTransition(() => {
            declineAction(requestId);
        });
    }

    return (
        <div className="flex items-center gap-2">
            {/* Decline friend request button */}
            <Button
                disabled={isDeclining}
                onClick={() => handleDecline(requestId)}
                variant="ghost"
                className="min-w-18"
            >
                {isDeclining ? <Spinner /> : "Decline"}
            </Button>

            {/* Accept friend request button */}
            <Button
                disabled={isAccepting}
                onClick={() => handleAccept(requestId)}
                className="min-w-18"
                // className="h-fit text-sm text-nowrap"
            >
                {isAccepting ? <Spinner /> : "Accept"}
            </Button>
        </div>
    );
}