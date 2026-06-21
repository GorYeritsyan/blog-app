import {format} from "date-fns";
import {TMessage} from "@/types/types";

export default function MessageDateTime({ lastMessage, updatedAt }: { lastMessage?: TMessage; updatedAt: Date }) {
    const currentDay = new Date().getDay();
    // Show only hours if message was send current day, otherwise show hours with month day
    const messageDateFormat = new Date(lastMessage?.createdAt ? lastMessage.createdAt : updatedAt).getDay() === currentDay ? "HH:mm" : "MMM d 'at' HH:mm";

    return (
        <span className="text-sm text-zinc-600">
            {format(lastMessage?.createdAt ? lastMessage.createdAt : updatedAt, messageDateFormat)}
        </span>
    );
}