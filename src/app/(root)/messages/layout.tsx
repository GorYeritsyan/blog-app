import { ReactNode } from "react";
import MessagesSidebar from "@/components/shared/messages/MessagesSidebar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <section>
            <div className="border border-zinc-200 shadow-xs shadow-zinc-100 rounded-xl min-h-screen w-full flex items-stretch">
                <MessagesSidebar />
                {children}
            </div>
        </section>
    );
}