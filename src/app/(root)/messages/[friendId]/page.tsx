import {getMessages} from "@/actions/messages";
import  MessagesContent from "@/components/shared/messages/MessagesContent";
import MessagesInput from "@/components/shared/messages/MessagesInput";
import MessageProvider from "@/providers/MessageProvider";
import {getCurrentUser} from "@/actions/auth";

export default async function Page({ params }: PageProps<"/messages/[friendId]">) {
    const { friendId } = await params;
    const currentUser = await getCurrentUser();
    const { data: messages } = await getMessages(+friendId);

    return (
        <section className="flex flex-col h-full w-full min-w-0">
            {/*Content */}
            {/*<MessageProvider messagesPromise={messagesPromise} friendId={+friendId}>*/}
                <MessagesContent friendId={+friendId} messages={messages} currentUser={currentUser} />
            {/*</MessageProvider>*/}

            {/*Input*/}
            <MessagesInput friendId={+friendId} />
        </section>
    )
}