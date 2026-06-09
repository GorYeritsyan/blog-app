import {format} from "date-fns";
import {cn} from "@/lib/utils";

export default function Message({ message, currentUser }) {
    const isCurrentUserMessage = currentUser.id === message.sender.id;

    return (
        <div className={cn("flex gap-0.5 w-full", isCurrentUserMessage && "justify-end")}>
            <div className="flex flex-col gap-0.5 w-fit">
                <div className="flex items-center gap-2 w-full">
                    <span className="font-medium">{message.sender.name}</span> {format(message.createdAt, "HH:MM")}
                </div>
                <div className={cn("px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-100 w-fit rounded-tl-none",
                    isCurrentUserMessage && "bg-zinc-800 text-white rounded-tr-none rounded-tl-lg"
                )}>
                    {message.content}
                </div>
            </div>
        </div>
    )
}