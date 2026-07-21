import {Skeleton} from "@/components/shadcn/skeleton";

export default function ChatConversationsSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    )
}