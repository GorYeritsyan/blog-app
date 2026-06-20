import {getFriends, getRooms} from "@/actions/users";
import Search from "@/components/shared/Search";
import ChatList from "@/components/shared/messages/ChatList";
import EmptyChatList from "@/components/empty/EmptyChatList";
import { getCurrentUser } from "@/actions/auth";
import {GroupChatDialog} from "@/components/shared/dialogs/GroupChatDialog";

export default async function MessagesSidebar() {
    const rooms = await getRooms();
    const currentUser = await getCurrentUser();
    const friends = await getFriends();

    return (
        <div className="max-w-90 w-full rounded-l-xl border-r border-zinc-200 overflow-hidden">
            <div className="flex flex-col h-full">
                <div className="bg-white px-4 py-3 flex items-center gap-2">
                    <div className="w-full">
                        <Search placeholder="Search" />
                    </div>
                    {/*<Button className="w-fit">Create Chat</Button>*/}
                    <GroupChatDialog members={friends} />
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