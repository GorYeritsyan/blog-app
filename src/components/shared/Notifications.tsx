"use client";

import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";

import Button from "@/src/components/ui/Button";
import NotificationsList from "@/src/components/shared/NotificationsList";
import { type TFriendRequest } from "@/src/types/types";

export default function Notifications({ notifications }: { notifications: TFriendRequest[] }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative">
            <Button onClick={toggleDropdown} variant="outline" className="p-2">
                <FaRegBell />
            </Button>

            {isOpen && (
                <NotificationsList notifications={notifications} />
            )}
        </div>
    );
}