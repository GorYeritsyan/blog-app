"use client";

import { startTransition, useActionState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "@/actions/users";
import Button from "@/components/ui/Button";

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
                loading={isDeclining}
                onClick={() => handleDecline(requestId)}
                variant="ghost"
            >
                Decline
            </Button>

            {/* Accept friend request button */}
            <Button
                disabled={isAccepting}
                loading={isAccepting}
                onClick={() => handleAccept(requestId)}
                className="h-fit text-sm text-nowrap"
            >
                Accept
            </Button>
        </div>
    );
}