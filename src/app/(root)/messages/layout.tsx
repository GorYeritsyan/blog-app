import { ReactNode } from "react";
import MessagesSidebar from "@/components/shared/messages/MessagesSidebar";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <section className="h-[calc(100vh-160px)] overflow-hidden">
            <div className="border border-zinc-200 shadow-xs shadow-zinc-100 rounded-xl h-full min-w-full flex items-stretch">
                <MessagesSidebar />
                {children}
            </div>
        </section>
    );
}