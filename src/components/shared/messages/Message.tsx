import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TMessage, TUser } from "@/types/types";

export default function Message({ message, currentUser }: { message: TMessage; currentUser?: TUser }) {
    const isCurrentUserMessage = currentUser?.id === message.senderId;
    const currentDay = new Date().getDay();

    console.log("currentUser", currentUser);
    console.log("message", message);

    // Show only hours if message was send current day, otherwise show hours with month day
    const messageDateFormat = new Date(message.createdAt).getDay() === currentDay ? "HH:mm" : "MMM d 'at' HH:mm";

    return (
        <div className={cn("flex gap-0.5 w-full", isCurrentUserMessage && "justify-end")}>
            <div className={cn("flex flex-col gap-0.5 w-fit", isCurrentUserMessage && "items-end")}>
                {/* Name of user who sent message */}
                <span className="font-medium">{isCurrentUserMessage ? "Me" : message.sender.name}</span>
                <div className={cn("px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-100 max-w-90 w-fit h-fit wrap-break-word rounded-tl-none",
                    isCurrentUserMessage && "bg-zinc-800 border-zinc-800 text-white rounded-tr-none rounded-tl-lg"
                )}>
                    {message.content}
                </div>

                {/* Time when message sent */}
                <span className="text-sm text-zinc-600">{format(message.createdAt, messageDateFormat)}</span>
            </div>
        </div>
    )
}