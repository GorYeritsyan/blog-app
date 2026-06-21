import {Suspense} from "react";
import {getChatById, getMessages} from "@/actions/messages";
import  MessagesContent from "@/components/shared/messages/MessagesContent";
import MessagesInput from "@/components/shared/messages/MessagesInput";
import {getCurrentUser} from "@/actions/auth";
import MessagesSkeleton from "@/components/shared/skeletons/MessagesSkeleton";
import ChatHeader from "@/components/shared/messages/ChatHeader";

export default async function Page({ params }: PageProps<"/messages/[roomId]">) {
    const { roomId } = await params;
    const currentUser = await getCurrentUser();
    const chatDetails = await getChatById(+roomId);
    const messagesPromise = getMessages(+roomId);

    console.log("chat", chatDetails);

    return (
        <section className="flex flex-col flex-1 h-full w-full min-w-0">
            <ChatHeader chatDetails={chatDetails} currentUserId={currentUser.id} />

            {/*Content */}
            <Suspense fallback={
                <div className="flex-1 flex flex-col justify-end p-6">
                    <MessagesSkeleton />
                </div>
            } >
                <MessagesContent roomId={+roomId} messagesPromise={messagesPromise} currentUser={currentUser} />
            </Suspense>

            {/*Input*/}
            <MessagesInput roomId={+roomId} />
        </section>
    )
}