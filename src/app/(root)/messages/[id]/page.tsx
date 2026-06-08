import {getMessages} from "@/actions/messages";
import {Input} from "@/components/shadcn/input";

export default async function Page({ params }: PageProps<"/messages/[id]">) {
    const { id } = await params;
    const messages = await getMessages(+id);

    console.log(messages);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full self-stretch bg-red-500">
            <div className="flex flex-col gap-1">
                {messages.map(message => (
                    <div key={message.id}>{message.content}</div>
                ))}
            </div>

        </div>
    )
}