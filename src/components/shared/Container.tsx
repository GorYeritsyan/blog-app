import { ReactNode } from "react";
import { cn } from "@/utils/utils";

export default function Container({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={cn("max-w-7xl m-auto h-full", className)}>
            {children}
        </div>
    );
}