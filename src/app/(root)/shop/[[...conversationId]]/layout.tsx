import {ReactNode} from "react";
import ChatDrawer from "@/components/shared/drawers/ChatDrawer";

export default function ShopLayout({ children }: LayoutProps<"/shop/[[...conversationId]]">) {
    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Shop</h1>
                <ChatDrawer />
            </div>
            {children}
        </section>
    );
}