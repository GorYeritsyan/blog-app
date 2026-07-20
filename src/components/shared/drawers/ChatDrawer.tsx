"use client";

import { Astroid } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import ChatMessages from "@/components/shared/chat/ChatMessages";
import { getCurrentUser } from "@/actions/auth";
import {getConversationMessages, sendConversationMessage} from "@/actions/conversations";
import {Suspense, useState} from "react";
import ChatInput from "@/components/shared/chat/ChatInput";

export default function ChatDrawer({ conversationId, messages }: { conversationId: number }) {
    // const chatMessagesPromise = getConversationMessages(conversationId);


    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Astroid />
                    AI Chatbot
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">AI Chatbot</DrawerTitle>
                    <DrawerDescription>
                        Chat with our assistant for help and questions.
                    </DrawerDescription>
                </DrawerHeader>

                {/*<div className="flex flex-col justify-between h-full px-3">*/}
                {/*    {cartItems.length > 0 && (*/}
                {/*        <div className="flex flex-col gap-3">*/}
                {/*            {cartItems.map((item: TCartItem) => (*/}
                {/*                <CartItem key={item.id} item={item} />*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}

                {/*<Suspense fallback={<span>Loading...</span>}>*/}
                    <ChatMessages
                        // chatMessagesPromise={chatMessagesPromise}
                        messages={messages}
                    />
                {/*</Suspense>*/}

                <DrawerFooter>
                    <ChatInput />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}