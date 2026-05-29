"use client";

import { type TFriendRequest } from "@/types/types";
import Notification from "@/components/shared/Notification";

export default function NotificationsList({ notifications }: { notifications: TFriendRequest[] }) {
    return (
        <div className="flex flex-col absolute top-full right-0 mt-1.5 bg-white w-100 max-h-100 min-h-20 h-fit border border-zinc-100 shadow-xs shadow-zinc-100 rounded-md overflow-y-auto">
            <h3 className="text-lg font-medium p-4">Notifications</h3>

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