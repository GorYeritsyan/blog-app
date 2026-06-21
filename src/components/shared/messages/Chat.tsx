import {cn} from "@/lib/utils";
import {TRoom} from "@/types/types";
import {usePathname} from "next/navigation";
import MessageDateTime from "@/components/shared/messages/MessageDateTime";

export default function Chat({ room, currentUserId, onlineUsers }: { room: TRoom; currentUserId?: number; onlineUsers: string[]; }) {
    const pathname = usePathname();
    const roomId = pathname.split("/").at(-1);

    const member = room?.members?.find(member => member.userId !== currentUserId);

    const chatName = room.type === "DM" ? member?.user?.name : room?.name;
    const lastMessage = room.messages?.at(0);

    const userId = room.type === "DM" && member?.userId;
    const isOnline = !!onlineUsers.find(onlineUserId => onlineUserId === userId);

    return (
        <div className={cn("px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col",
            typeof roomId !== "undefined" && +roomId === room?.id && "bg-zinc-100"
        )}>
            <div className="flex items-center justify-between">
                <div className="relative">
                    <h4 className="text-lg font-medium">{chatName}</h4>
                    {isOnline && (
                        <div className="absolute top-1.5 -right-4 size-2 rounded-full bg-green-500" />
                    )}
                </div>
                <MessageDateTime lastMessage={lastMessage} updatedAt={room.updatedAt} />
            </div>

            <p className="text-zinc-500 truncate text-ellipsis">{lastMessage?.content ? `${lastMessage.sender.name}: ${lastMessage.content}` : "No messages yet"}</p>
        </div>
    )
}