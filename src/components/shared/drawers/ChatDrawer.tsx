"use client";

import { useState, useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import {Astroid, PanelRight} from "lucide-react";
import {
    Drawer, DrawerContent, DrawerDescription, DrawerFooter,
    DrawerHeader, DrawerTitle, DrawerTrigger
} from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import ChatMessages from "@/components/shared/chat/ChatMessages";
import ChatInput from "@/components/shared/chat/ChatInput";
import { TChatMessage } from "@/types/types";
import { getConversationMessages, sendConversationMessage } from "@/actions/conversations";
import {Skeleton} from "@/components/shadcn/skeleton";
import ChatSkeleton from "@/components/shared/skeletons/ChatSkeleton";
import {toast} from "sonner";
import ChatSidebarDrawer from "@/components/shared/drawers/ChatSidebarDrawer";
import ChatEmpty from "@/components/shared/chat/ChatEmpty";

export default function ChatDrawer() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<TChatMessage[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [isPending, startTransition] = useTransition();
    const params = useParams();
    const router = useRouter();
    const conversationId = params.conversationId?.at(-1);

    useEffect(() => {
        if (!conversationId) {
            setMessages([]);
            return;
        }
        startTransition(async () => {
            const conversationMessages = await getConversationMessages(+conversationId);
            setMessages(conversationMessages);
        });
    }, [conversationId]);

    // Open drawer when there is conversationId
    useEffect(() => {
        if (conversationId) {
            setOpen(true);
        }
    }, [conversationId]);

    const sendMessage = async (content: string) => {
        const isNewChat = !conversationId;

        // 1. optimistic user message, shown instantly
        const optimisticUserMessage: TChatMessage = {
            id: Date.now(),
            role: "user",
            content,
            createdAt: new Date(Date.now())
        };
        setMessages(prev => [...prev, optimisticUserMessage]);

        // 2. show "thinking" state while waiting for assistant
        setIsThinking(true);

        try {
            const { data: assistantMessage, error } = await sendConversationMessage(
                isNewChat ? { content } : { conversationId: +conversationId, content }
            );

            if (error) toast.error(error.message);

            if (isNewChat && assistantMessage) {
                // redirect; the useEffect above will refetch full history
                // (including this exchange) once conversationId updates
                router.push(`/shop/conversations/${assistantMessage.conversationId}`);
            } else if (assistantMessage) {
                setMessages(prev => [...prev, assistantMessage]);
            }
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Astroid />
                    AI Chatbot
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">
                        <div className="flex items-center justify-between">
                            <h3>AI Chatbot</h3>
                            <ChatSidebarDrawer />
                        </div>
                    </DrawerTitle>
                    <DrawerDescription>
                        Chat with our assistant for help and questions.
                    </DrawerDescription>
                </DrawerHeader>


                {isPending ? (
                    <ChatSkeleton />
                ) : (
                    messages && messages.length > 0 ? (
                        <ChatMessages messages={messages} isThinking={isThinking} />
                    ) : (
                        <ChatEmpty />
                    )
                )}

                <DrawerFooter>
                    <ChatInput onSend={sendMessage} disabled={isThinking} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}