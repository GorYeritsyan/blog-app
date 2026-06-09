import {getMessages} from "@/actions/messages";
import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import { format } from "date-fns";
import {Textarea} from "@/components/shadcn/textarea";
import {Send} from "lucide-react";
import {getCurrentUser} from "@/actions/auth";
import  MessagesContent from "@/components/shared/messages/MessagesContent";

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
            <div className="w-full min-h-14 border-t border-zinc-200 px-4 py-3 flex items-end">
                <div className="flex items-center justify-center gap-2 w-full">
                    <Input placeholder="Send message..." className="py-1.5 h-fit" />
                    <Button size="lg" className="px-3 text-base">
                        Send
                    </Button>
                </div>
            </div>
        </section>
    )
}