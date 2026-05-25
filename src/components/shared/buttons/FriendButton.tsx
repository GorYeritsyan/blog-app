"use client";

import Button from "@/src/components/ui/Button";
import {getFriendStatus} from "@/src/utils/utils";
import {startTransition, useActionState} from "react";
import {removeFriend, sendFriendRequest} from "@/src/actions/users";
import {TFriendRequestStatus} from "@/src/types/types";

export default function FriendButton({ friendStatus, friendId }: { friendId: number; friendStatus: TFriendRequestStatus }) {
    const [error, sendAction, isSending] = useActionState(sendFriendRequest, undefined);
    const [removeError, removeAction, isRemoving] = useActionState(removeFriend, undefined);
    const isFriends = friendStatus === "accepted";

    // action to follow author
    function handleAddFriend(authorId: number) {
        startTransition(() => {
            sendAction(authorId);
        });
    }

    function handleRemoveFriend(authorId: number) {
        startTransition(() => {
            removeAction(authorId);
        });
    }

    function handleButtonClick(friendId: number) {
        return friendStatus === "accepted" ?  handleRemoveFriend(friendId) : handleAddFriend(friendId);
    }

    return (
        <Button
            disabled={isSending || isRemoving || friendStatus === "pending"}
            loading={isSending || isRemoving}
            onClick={() => handleButtonClick(friendId)}
            variant={friendStatus === "pending" || isFriends ? "outline" : "primary"}
            className="capitalize min-w-24"
        >
            {getFriendStatus(friendStatus)}
        </Button>
    )
}