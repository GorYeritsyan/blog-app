import {getFriends} from "@/actions/users";
import {TUser} from "@/types/types";
import Link from "next/link";

export default async function MessagesSidebar() {
    const friends = await getFriends();
    console.log(friends);

    return (
        <div className="min-w-100 overflow-y-auto rounded-l-xl border-r border-zinc-200">
            <div>
                {friends.map((friend: TUser) => (
                    <Link href={`/messages/${friend.id}`} key={friend.id}>
                        <div className="px-4 pl-6 py-3 border-b border-zinc-200 hover:bg-zinc-100 cursor-pointer flex flex-col">
                            <h4 className="text-lg font-medium">{friend.name}</h4>
                            <p className="text-zinc-500">{friend.email}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}