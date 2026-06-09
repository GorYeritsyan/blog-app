import {getCurrentUser} from "@/actions/auth";
import Message from "@/components/shared/messages/Message";
import {TMessage} from "@/types/types";

export default async function MessagesContent({ messages }: { messages: TMessage[] }) {
    const currentUser = await getCurrentUser();

    return (
        <div id="message-content" className="flex-1 h-full flex flex-col justify-end gap-3 p-6 overflow-y-auto">
            {messages.map(message => (
                <Message key={message.id} message={message} currentUser={currentUser} />
            ))}
        </div>
    )
}