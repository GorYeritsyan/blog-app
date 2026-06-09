import {format} from "date-fns";
import {getCurrentUser} from "@/actions/auth";
import Message from "@/components/shared/messages/Message";

export default async function MessagesContent({ messages }) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex-1 flex flex-col gap-3 p-6">
            {messages.map(message => (
                <Message key={message.id} message={message} currentUser={currentUser} />
            ))}
        </div>
    )
}