import {getFriends} from "@/actions/users";
import {TUser} from "@/types/types";
import Link from "next/link";
import {Input} from "@/components/shadcn/input";
import Search from "@/components/shared/Search";
import {cn} from "@/lib/utils";
import ChatList from "@/components/shared/messages/ChatList";
import {Button} from "@/components/shadcn/button";

export default async function MessagesSidebar() {
    const friends = await getFriends();

    return (
        <div className="min-w-100 rounded-l-xl border-r border-zinc-200 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className=" bg-white px-4 py-3">
                    <Search placeholder="Search" />
                </div>

                {friends.length > 0 ? (
                    <ChatList friends={friends} />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center justify-center text-center text-zinc-500">
                            <p>Your chat list is empty.</p>
                            <p>Try adding some friends to start chatting!</p>
                        </div>
                        <Link href="/users">
                            <Button>Find friends</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}