import {getMessages} from "@/actions/messages";
import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import { format } from "date-fns";
import {Textarea} from "@/components/shadcn/textarea";
import {Send} from "lucide-react";
import {getCurrentUser} from "@/actions/auth";
import  MessagesContent from "@/components/shared/messages/MessagesContent";
import MessagesInput from "@/components/shared/messages/MessagesInput";

export default async function Page({ params }: PageProps<"/messages/[friendId]">) {
    const { friendId } = await params;
    const messages = await getMessages(+friendId);
    const currentUser = await getCurrentUser();

    console.log("messages", messages);

    return (
        <section className="flex flex-col w-full">

            {/*Content */}
            <MessagesContent messages={messages} />

            {/*Input*/}
            <MessagesInput friendId={+friendId} />
        </section>
    )
}