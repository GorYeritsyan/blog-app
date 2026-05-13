import { LuLoaderCircle } from "react-icons/lu";
import { cn } from "@/src/utils/utils";

export default function Spinner({ className }: { className?: string }) {
    return (
        <LuLoaderCircle className={cn("text-4xl animate-spin", className)} />
    )
}