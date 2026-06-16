import { Skeleton } from "@/components/shadcn/skeleton";

export default function MessagesSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-50">
                <Skeleton className="h-4 w-40"/>
                <Skeleton className="h-10" />
            </div>

            <div className="flex flex-col gap-2 w-50 self-end">
                <Skeleton className="h-4 w-40 self-end"/>
                <Skeleton className="h-10" />
            </div>

            <div className="flex flex-col gap-2 w-50">
                <Skeleton className="h-4 w-40"/>
                <Skeleton className="h-10" />
            </div>

            <div className="flex flex-col gap-2 w-50 self-end">
                <Skeleton className="h-4 w-40 self-end"/>
                <Skeleton className="h-10" />
            </div>
        </div>
    );
}