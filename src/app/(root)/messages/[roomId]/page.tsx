import {getMessages} from "@/actions/messages";
import  MessagesContent from "@/components/shared/messages/MessagesContent";
import MessagesInput from "@/components/shared/messages/MessagesInput";
import {getCurrentUser} from "@/actions/auth";
import {Suspense} from "react";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";

export default async function Page({ params }: PageProps<"/messages/[roomId]">) {
    const { roomId } = await params;
    const currentUser = await getCurrentUser();
    const messagesPromise = getMessages(+roomId);

    return (
        <section className="flex flex-col flex-1 h-full w-full min-w-0">
            {/*Content */}
            <Suspense fallback={
                <div className="flex-1 flex flex-col justify-end p-6">
                    <MessagesSkeleton />
                </div>
            } >
                <MessagesContent friendId={+roomId} messagesPromise={messagesPromise} currentUser={currentUser} />
            </Suspense>

            {/*Input*/}
            <MessagesInput friendId={+roomId} />
        </section>
    )
}