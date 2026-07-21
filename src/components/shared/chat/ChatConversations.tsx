"use client";

import Link from "next/link";
import {useParams} from "next/navigation";
import {cn} from "@/lib/utils";

import {TConversation} from "@/types/types";
import {Button} from "@/components/shadcn/button";

export default function ChatConversations({ conversations }: { conversations: TConversation[] }) {
    const params = useParams();
    const conversationId = params?.conversationId?.at(-1);

    return (
        <div className="flex flex-col gap-2 overflow-y-auto w-full">
            {conversations.map(conversation => (
                <Button
                    key={conversation.id}
                    variant="ghost"
                    className={cn("w-full min-w-0 px-3", conversationId && +conversationId === conversation?.id && "bg-muted text-foreground")}
                    asChild
                >
                    <Link href={`/shop/conversations/${conversation.id}`} className="min-w-0">
                            <span className="truncate block min-w-0">
                                {conversation?.title ?? "Untitled"}
                            </span>
                    </Link>
                </Button>
            ))}
        </div>
    );
}