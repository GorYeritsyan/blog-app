import Skeleton from "@/components/ui/Skeleton";

export default function BlogPostDetailsSkeleton() {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3">
                <Skeleton />

                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
            </div>

            <Skeleton className="h-30" />
        </div>
    );
}