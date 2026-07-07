"use client";

import { type TFriendRequest } from "@/types/types";
import Notification from "@/components/shared/Notification";

export default function NotificationsList({ notifications }: { notifications: TFriendRequest[] }) {
    return (
        <div>
            {notifications.length > 0 ? (
                <div className="flex flex-col *:last:border-none">
                    {notifications.map((notification: TFriendRequest) => (
                        <Notification key={notification.id} notification={notification} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center pb-4 flex-1 text-zinc-400 font-medium">
                    There is no notifications
                </div>
            )}
        </div>
    );
}