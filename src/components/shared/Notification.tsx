"use client";

import { formatDistanceToNow } from "date-fns";
import FriendRequestButtons from "@/src/components/shared/buttons/FriendRequestButtons";
import { type TFriendRequest } from "@/src/types/types";

export default function Notification({ notification }: { notification: TFriendRequest }) {
    return (
        <div key={notification.id} className="px-4 py-3 hover:bg-zinc-50 flex items-center justify-between gap-3 border-b border-zinc-100">
            <div className="flex flex-col gap-0.5">
                <p className="leading-tight">
                    <span className="font-medium text-zinc-900">{notification?.sender?.name}</span> sent you a friend request.
                </p>
                <span className="text-sm text-zinc-500">{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
            </div>

            {/* Accept and Decline buttons */}
            <FriendRequestButtons requestId={notification.id} />
        </div>
    )
}