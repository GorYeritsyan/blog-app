"use client";

import {getFriendStatus} from "@/utils/utils";
import {startTransition, useActionState} from "react";
import {removeFriend, sendFriendRequest} from "@/actions/users";
import {TFriendRequestStatus} from "@/types/types";
import {Button} from "@/components/shadcn/button";
import {Spinner} from "@/components/shadcn/spinner";

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
            onClick={() => handleButtonClick(friendId)}
            disabled={isSending || isRemoving || friendStatus === "pending"}
            {...((friendStatus === "pending" || isFriends) && { variant: "outline" } )}
            size="lg"
            className="capitalize min-w-24 text-base"
        >
            {isSending || isRemoving ? <Spinner className="size-5" /> : getFriendStatus(friendStatus)}
        </Button>
    )
}