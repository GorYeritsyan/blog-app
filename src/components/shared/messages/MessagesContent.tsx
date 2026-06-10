import {getCurrentUser} from "@/actions/auth";
import Message from "@/components/shared/messages/Message";
import {TMessage} from "@/types/types";

export default async function MessagesContent({ messages }: { messages: TMessage[] }) {
    const currentUser = await getCurrentUser();

    return (
        <div id="message-content" className="flex-1 min-h-0 flex flex-col gap-3 p-6 overflow-y-auto">
            {messages.length > 0 ? (
                messages.map(message => (
                    <Message key={message.id} message={message} currentUser={currentUser} />
                ))
            ) : (
                <p className="text-zinc-500 text-center">Send message to start conversation</p>
            )}
        </div>
    )
}