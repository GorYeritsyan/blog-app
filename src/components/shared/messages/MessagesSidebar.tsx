import {getFriends} from "@/actions/users";
import {TUser} from "@/types/types";
import Link from "next/link";
import {Input} from "@/components/shadcn/input";
import Search from "@/components/shared/Search";
import {cn} from "@/lib/utils";

export default async function MessagesSidebar() {
    const friends = await getFriends();
    console.log(friends);

    return (
        <div className="min-w-100 rounded-l-xl border-r border-zinc-200 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className=" bg-white px-4 py-3">
                    <Search placeholder="Search" />
                </div>
                <div className="flex flex-col h-full overflow-y-auto">
                    {friends.map((friend: TUser) => (
                        <Link href={`/messages/${friend.id}`} key={friend.id}>
                            <div className="px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col">
                                <h4 className="text-lg font-medium">{friend.name}</h4>
                                <p className="text-zinc-500">{friend.email}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}