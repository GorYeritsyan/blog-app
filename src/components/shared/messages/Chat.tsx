import {cn} from "@/lib/utils";
import {TRoom} from "@/types/types";
import {usePathname} from "next/navigation";

export default function Chat({ room, currentUserId }: { room: TRoom; currentUserId?: number }) {
    const pathname = usePathname();
    const roomId = pathname.split("/").at(-1);

    const user = room?.members?.find(member => member.userId !== currentUserId)?.user;

    return (
        <div className={cn("px-4 pl-6 py-3 hover:bg-zinc-100 cursor-pointer flex flex-col",
            typeof roomId !== "undefined" && +roomId === room?.id && "bg-zinc-100"
        )}>
            <h4 className="text-lg font-medium">{user?.name}</h4>
            <p className="text-zinc-500">{user?.email}</p>
        </div>
    )
}