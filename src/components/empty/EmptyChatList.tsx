import {Tab} from "@/components/shared/messages/ChatList";

export default function EmptyChatList({ type }: { type: Tab }) {
    return (
        <p className="text-sm text-zinc-400 text-center py-6">
            {type === "DM" ? "No direct messages yet" : "No groups yet"}
        </p>
    );
}