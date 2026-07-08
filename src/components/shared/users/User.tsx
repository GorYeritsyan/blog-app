"use client";

import type { TFriendRequest, TFriendRequestStatus, TUser } from "@/types/types";
import FriendRequestButtons from "@/components/shared/buttons/FriendRequestButtons";
import FriendButton from "@/components/shared/buttons/FriendButton";

type UserProps = {
    user: TUser;
    sentFriendRequests: TFriendRequest[];
    receivedFriendRequests: TFriendRequest[];
}

//  TODO: Show error toast when something went wrong
export default function User({ user, sentFriendRequests, receivedFriendRequests }: UserProps) {
    // Get author status from all sent and received friend requests - pending, accepted, rejected
    const  userStatus = [...sentFriendRequests, ...receivedFriendRequests]?.find(request => request.receiverId === user.id || request.senderId === user.id)?.status?.toLowerCase() as Lowercase<TFriendRequestStatus>;
    const friendRequest = receivedFriendRequests?.find(request => request.senderId === user.id && request.status === "PENDING");

    return (
        <div className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 rounded-md border border-zinc-200">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">{user.name}</h3>
                <span className="text-zinc-500">{user.email}</span>
            </div>

            {!!friendRequest ? (
                <FriendRequestButtons requestId={friendRequest.id} />
            ) : (
                <FriendButton friendId={user.id} friendStatus={userStatus} />
            )}
        </div>
    );
}