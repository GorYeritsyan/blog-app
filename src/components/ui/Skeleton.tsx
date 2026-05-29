import { cn } from "@/utils/utils";

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn("bg-zinc-100 animate-pulse rounded-lg h-10 min-h-4 w-full", className)}/>
    );
}