import {Skeleton} from "@/components/shadcn/skeleton";

export default function ChatSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <Skeleton className="h-8 w-full max-w-40 self-end" />

            <Skeleton className="h-5 w-full max-w-70" />
            <Skeleton className="h-5 w-full max-w-80" />
            <Skeleton className="h-5 w-full max-w-60" />
            <Skeleton className="h-5 w-full max-w-80" />
            <Skeleton className="h-5 w-full max-w-60" />
            <Skeleton className="h-5 w-full max-w-70" />
        </div>
    );
}