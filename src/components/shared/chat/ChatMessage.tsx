import { format, isToday } from "date-fns";
import {cn} from "@/lib/utils";

export default function ChatMessage({ message, role }: { message: unknown; role: "assistant" | "user" }) {
    const isUserMessage = role === "user";
    const messageDateFormat = isToday(new Date(message.createdAt)) ? "HH:mm" : "MMM d 'at' HH:mm";

    return (
        <div className={cn("flex gap-0.5 w-full", isUserMessage && "justify-end")}>
            <div className={cn("flex flex-col gap-0.5 w-fit", isUserMessage && "items-end")}>
                {/* Name of user who sent message */}
                <span className="font-medium">{isUserMessage ? "Me" : "User"}</span>
                <div className={cn("px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-100 max-w-90 w-fit h-fit wrap-break-word rounded-tl-none",
                    isUserMessage && "bg-zinc-800 border-zinc-800 text-white rounded-tr-none rounded-tl-lg"
                )}>
                    {message.content}
                </div>

                {/* Time when message sent */}
                <span className="text-sm text-zinc-600">{format(message.createdAt, messageDateFormat)}</span>
            </div>
        </div>
    );
}