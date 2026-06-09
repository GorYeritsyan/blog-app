import {format} from "date-fns";
import {getCurrentUser} from "@/actions/auth";
import Message from "@/components/shared/messages/Message";
import {TMessage} from "@/types/types";

export default async function MessagesContent({ messages }: { messages: TMessage[] }) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex-1 flex flex-col gap-3 p-6 overflow-y-auto">
            {messages.map(message => (
                <Message key={message.id} message={message} currentUser={currentUser} />
            ))}
        </div>
    )
}