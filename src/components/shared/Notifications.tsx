"use client";

import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";

import Button from "@/components/ui/Button";
import NotificationsList from "@/components/shared/NotificationsList";
import { type TFriendRequest } from "@/types/types";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger
} from "@/components/shadcn/popover";
import Notification from "@/components/shared/Notification";

export default function Notifications({ notifications }: { notifications: TFriendRequest[] }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-2 relative">
                    <FaRegBell />
                    {notifications.length > 0 && (
                        <div className="size-2 rounded-full bg-red-400 absolute -top-px -right-px flex items-center justify-center"></div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-100 max-h-100 min-h-20 overflow-y-auto p-0">
                <PopoverHeader className="px-3 pt-2">
                    <PopoverTitle className="text-base">Notifications</PopoverTitle>
                </PopoverHeader>
                <NotificationsList notifications={notifications} />
            </PopoverContent>
        </Popover>
    );
}