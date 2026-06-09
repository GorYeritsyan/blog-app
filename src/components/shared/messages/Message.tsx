import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {TMessage, TUser} from "@/types/types";

export default function Message({ message, currentUser }: { message: TMessage; currentUser?: TUser }) {
    const isCurrentUserMessage = currentUser?.id === message.sender.id;

    return (
        <div className={cn("flex gap-0.5 w-full", isCurrentUserMessage && "justify-end")}>
            <div className="flex flex-col gap-0.5 w-fit">
                <div className={cn("flex items-center gap-2 w-full", isCurrentUserMessage && "justify-end")}>
                    {/* Name of user who sent message */}
                    <span className="font-medium">{isCurrentUserMessage ? "Me" : message.sender.name}</span>

                    {/* Time when message sent */}
                    <span>{format(message.createdAt, "HH:mm")}</span>
                </div>
                <div className={cn("px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-100 max-w-90 w-fit h-fit wrap-break-word rounded-tl-none",
                    isCurrentUserMessage && "bg-zinc-800 text-white rounded-tr-none rounded-tl-lg"
                )}>
                    {message.content}
                </div>
            </div>
        </div>
    )
}