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
import { getConversationMessages } from "@/actions/conversations";

export default async function ChatDrawer() {
    const currentUser = await getCurrentUser();
    const conversationId = 5;
    const chatMessagesPromise = getConversationMessages(conversationId);

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

                <ChatMessages
                    conversationId={conversationId}
                    chatMessagesPromise={chatMessagesPromise}
                />

                <DrawerFooter>
                    <div className="flex gap-2">
                        <Input placeholder="Write a message..." />
                        <Button>Send</Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}