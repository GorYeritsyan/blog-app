"use client";

import {useEffect, useState, useTransition} from "react";
import {CirclePlus, PanelRight} from "lucide-react";
import Link from "next/link";

import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/shadcn/drawer";
import {Button} from "@/components/shadcn/button";
import {getAllConversations} from "@/actions/conversations";
import ChatConversations from "@/components/shared/chat/ChatConversations";
import ChatConversationsSkeleton from "@/components/shared/skeletons/ChatConversationsSkeleton";
import {TConversation} from "@/types/types";

export default function ChatSidebarDrawer() {
    const [conversations, setConversations] = useState<TConversation[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const allConversations = await getAllConversations();
            setConversations(allConversations);
        });
    }, []);

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PanelRight />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=right]:w-68">
                <DrawerHeader>
                    <DrawerTitle className="text-base">Chats</DrawerTitle>
                    <Button className="mt-2" variant="outline" asChild>
                        <Link href="/shop">
                            <CirclePlus />
                            New Chat
                        </Link>
                    </Button>
                </DrawerHeader>

                <div className="flex flex-col px-4 flex-1 min-h-0">
                    {isPending ? (
                        <ChatConversationsSkeleton />
                    ) : (
                        <ChatConversations conversations={conversations} />
                    )}
                </div>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}