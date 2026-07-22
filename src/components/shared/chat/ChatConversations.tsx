"use client";

import Link from "next/link";
import {useParams} from "next/navigation";
import {cn} from "@/lib/utils";

import {TConversation} from "@/types/types";
import {Button} from "@/components/shadcn/button";
import ChatConversationActions from "@/components/shared/chat/ChatConversationActions";

export default function ChatConversations({ conversations }: { conversations: TConversation[] }) {
    const params = useParams();
    const conversationId = params?.conversationId?.at(-1);

    return (
        <div className="flex flex-col gap-2 overflow-y-auto w-full">
            {conversations.length > 0 ? (
                conversations.map(conversation => (
                    <div key={conversation.id} className="w-full h-fit min-w-0 relative">
                        <Button
                            variant="ghost"
                            className={cn("w-full min-w-0 px-3 pr-8", conversationId && +conversationId === conversation?.id && "bg-muted text-foreground")}
                            asChild
                        >
                            <Link href={`/shop/conversations/${conversation.id}`} className="min-w-0">
                                <span className="truncate block min-w-0">
                                    {conversation?.title ?? "Untitled"}
                                </span>
                            </Link>
                        </Button>

                        <div className="absolute top-1/2 -translate-y-1/2 right-1">
                            <ChatConversationActions conversationId={conversation.id} />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-zinc-500">No conversations yet.</p>
            )}
        </div>
    );
}