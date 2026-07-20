import { format, isToday } from "date-fns";
import {cn} from "@/lib/utils";
import {TChatMessage} from "@/types/types";

export default function ChatMessage({ message }: { message: TChatMessage }) {
    const isUserMessage = message.role.toLowerCase() === "user";
    const messageDateFormat = isToday(new Date(message?.createdAt)) ? "HH:mm" : "MMM d 'at' HH:mm";

    return (
        <div className={cn("flex gap-0.5 w-full", isUserMessage && "justify-end")}>
            <div className={cn("flex flex-col gap-0.5 w-fit", isUserMessage && "items-end")}>
                {/* Name of user who sent message */}
                {/*<span className="font-medium">{isUserMessage ? "Me" : "User"}</span>*/}
                <div className={cn("w-fit h-fit max-w-80 wrap-break-word",
                    isUserMessage && "bg-zinc-100 border border-zinc-200  px-3 py-1.5 rounded-lg"
                )}>
                    {message.content}
                </div>

                {/* Time when message sent */}
                {isUserMessage && (
                    <span className="text-sm text-zinc-600">{format(new Date(message.createdAt), messageDateFormat)}</span>
                )}
            </div>
        </div>
    );
}