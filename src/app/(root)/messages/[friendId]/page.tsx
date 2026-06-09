import {getMessages} from "@/actions/messages";
import  MessagesContent from "@/components/shared/messages/MessagesContent";
import MessagesInput from "@/components/shared/messages/MessagesInput";

export default async function Page({ params }: PageProps<"/messages/[friendId]">) {
    const { friendId } = await params;
    const messages = await getMessages(+friendId);

    console.log("messages", messages);

    return (
        <section className="flex flex-col h-full w-full min-w-0">
            {/*Content */}
            <MessagesContent messages={messages} />

            {/*Input*/}
            <MessagesInput friendId={+friendId} />
        </section>
    )
}