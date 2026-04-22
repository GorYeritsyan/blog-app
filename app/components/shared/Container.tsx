import { ReactNode } from "react";
import { cn } from "@/app/utils/utils";

export default function Container({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={cn("max-w-7xl m-auto", className)}>
            {children}
        </div>
    );
}