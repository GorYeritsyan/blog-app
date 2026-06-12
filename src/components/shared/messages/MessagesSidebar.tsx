import {getFriends} from "@/actions/users";
import Search from "@/components/shared/Search";
import ChatList from "@/components/shared/messages/ChatList";
import EmptyChatList from "@/components/empty/EmptyChatList";

export default async function MessagesSidebar() {
    const friends = await getFriends();

    return (
        <div className="min-w-100 rounded-l-xl border-r border-zinc-200 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="bg-white px-4 py-3">
                    <Search placeholder="Search" />
                </div>

                {friends.length > 0 ? (
                    <ChatList friends={friends} />
                ) : (
                    <EmptyChatList />
                )}
            </div>
        </div>
    )
}