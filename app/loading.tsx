import Spinner from "@/app/components/ui/Spinner";

export default function Loading() {
    return (
        <div className="size-full min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    );
}