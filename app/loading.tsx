import { LuLoaderCircle } from "react-icons/lu";

export default function Loading() {
    return (
        <div className="size-full min-h-screen flex items-center justify-center">
            <LuLoaderCircle className="text-4xl animate-spin" />
        </div>
    );
}