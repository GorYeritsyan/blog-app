import Link from "next/link";
import {Button} from "@/components/shadcn/button";

export default function EmptyChatList() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center text-center text-zinc-500">
                <p>Your chat list is empty.</p>
                <p>Try adding some friends to start chatting!</p>
            </div>
            <Link href="/users">
                <Button>Find friends</Button>
            </Link>
        </div>
    )
}