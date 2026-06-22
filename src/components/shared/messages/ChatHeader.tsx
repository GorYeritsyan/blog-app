"use client";

import { cn } from "@/lib/utils";
import {useOnlineUsers} from "@/hooks/useOnlineUsers";
import {useSocket} from "@/providers/SocketProvider";
import {useMessages} from "@/providers/MessagesProvider";

export default function ChatHeader({ chatDetails, currentUserId }) {
    // const [isOnline, setIsOnline] = useState(false);
    const socket = useSocket();
    const { onlineUsers } = useMessages();

    const chatTitle = chatDetails.type === "GROUP" ? chatDetails.name : chatDetails.members.find(member => member.userId !== currentUserId).user.name;
    const isOnline = chatDetails.type === "DM" ? chatDetails.members.find(member => member.userId !== currentUserId && onlineUsers.includes(member.userId)) : false;
    const onlineMembersLength = chatDetails.type === "GROUP" ? chatDetails.members.filter(member => member.userId !== currentUserId && onlineUsers.includes(member.userId)).length : 0;

    //
    // useEffect(() => {
    //
    // }, []);
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("user connected");
    //     })
    //
    //     return () => {
    //         socket.off("connect");
    //         socket.disconnect();
    //     }
    // }, []);

    return (
        <div className="border-b border-b-zinc-200 px-4 py-3 flex flex-col gap-px">
            <h2 className="font-medium">{chatTitle}</h2>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full bg-zinc-300", (isOnline || onlineMembersLength > 0) && "bg-green-500")} />
                {chatDetails.type === "GROUP" ? (
                    <>
                        <span>{chatDetails.members.length} members</span>
                        {onlineMembersLength > 0 && (
                            <span>• {onlineMembersLength} online</span>
                        )}
                    </>
                ) : (
                    <>
                        <span>{isOnline ? "Online" : "Offline"}</span>
                        {/*<span>3 members • 2 online</span>*/}
                    </>
                )}
            </p>
        </div>
    );
}