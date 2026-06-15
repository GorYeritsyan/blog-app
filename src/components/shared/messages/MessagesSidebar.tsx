import { getRooms } from "@/actions/users";
import Search from "@/components/shared/Search";
import ChatList from "@/components/shared/messages/ChatList";
import EmptyChatList from "@/components/empty/EmptyChatList";
import { getCurrentUser } from "@/actions/auth";

export default async function MessagesSidebar() {
    const rooms = await getRooms();
    const currentUser = await getCurrentUser();

    return (
        <div className="min-w-100 rounded-l-xl border-r border-zinc-200 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="bg-white px-4 py-3">
                    <Search placeholder="Search" />
                </div>

                {rooms.length > 0 ? (
                    <ChatList currentUserId={currentUser?.id} rooms={rooms} />
                ) : (
                    <EmptyChatList />
                )}
            </div>
        </div>
    )
}