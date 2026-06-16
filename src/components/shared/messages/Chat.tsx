import {cn} from "@/lib/utils";
import {TRoom} from "@/types/types";
import {usePathname} from "next/navigation";
import {format} from "date-fns";

export default function Chat({ room, currentUserId }: { room: TRoom; currentUserId?: number }) {
    const pathname = usePathname();
    const roomId = pathname.split("/").at(-1);
    const currentDay = new Date().getDay();

    const chatName = room.type === "DM" ? room?.members?.find(member => member.userId !== currentUserId)?.user?.name : room?.name;
    const lastMessage = room.messages?.at(0);

    // Show only hours if message was send current day, otherwise show hours with month day
    const messageDateFormat = new Date(lastMessage?.createdAt ? lastMessage.createdAt : room.updatedAt).getDay() === currentDay ? "HH:mm" : "MMM d 'at' HH:mm";

    return (
        <div className={cn("px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col",
            typeof roomId !== "undefined" && +roomId === room?.id && "bg-zinc-100"
        )}>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium">{chatName}</h4>
                <span className="text-sm text-zinc-600">{format(lastMessage?.createdAt ? lastMessage.createdAt : room.updatedAt, messageDateFormat)}</span>
            </div>
            <p className="text-zinc-500 truncate text-ellipsis">{lastMessage?.content ? `${lastMessage.sender.name}: ${lastMessage.content}` : "No messages yet"}</p>
        </div>
    )
}