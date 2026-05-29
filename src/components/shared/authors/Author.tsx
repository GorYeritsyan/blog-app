"use client";

import type { TFriendRequest, TFriendRequestStatus, TUser } from "@/types/types";
import FriendRequestButtons from "@/components/shared/buttons/FriendRequestButtons";
import FriendButton from "@/components/shared/buttons/FriendButton";

type AuthorProps = {
    author: TUser;
    sentFriendRequests: TFriendRequest[];
    receivedFriendRequests: TFriendRequest[];
}

//  TODO: Show error toast when something went wrong
export default function Author({ author, sentFriendRequests, receivedFriendRequests }: AuthorProps) {
    // Get author status - pending, accepted, rejected
    const authorStatus = [...sentFriendRequests, ...receivedFriendRequests]?.find(request => request.receiverId === author.id || request.senderId === author.id)?.status?.toLowerCase() as TFriendRequestStatus;
    const friendRequest = receivedFriendRequests?.find(request => request.senderId === author.id && request.status === "PENDING");

    return (
        <div className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 rounded-md border border-zinc-200">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">{author.name}</h3>
                <span className="text-zinc-500">{author.email}</span>
            </div>

            {!!friendRequest ? (
                <FriendRequestButtons requestId={friendRequest.id} />
            ) : (
                <FriendButton friendId={author.id} friendStatus={authorStatus} />
            )}
        </div>
    );
}