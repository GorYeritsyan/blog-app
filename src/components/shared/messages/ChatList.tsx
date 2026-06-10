"use client";

import {TUser} from "@/types/types";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export default function ChatList({ friends }: { friends: TUser[] }) {
    const pathname = usePathname();
    const friendId = pathname.split("/").at(-1);

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {friends.map((friend) => (
                <Link href={`/messages/${friend.id}`} key={friend.id}>
                    <div className={cn("px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col",
                        typeof friendId !== "undefined" && +friendId === friend.id && "bg-zinc-100"
                    )}>
                        <h4 className="text-lg font-medium">{friend.name}</h4>
                        <p className="text-zinc-500">{friend.email}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}