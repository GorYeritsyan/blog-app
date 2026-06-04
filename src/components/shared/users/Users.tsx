import { getAllUsers } from "@/actions/users";
import Pagination from "@/components/ui/pagination";
import User from "@/components/shared/users/User";
import { getCurrentUser } from "@/actions/auth";
import { TUser } from "@/types/types";

export default async function  Users({ query, page }: { query?: string; page: number }) {
    const { data: users, totalPages } = await getAllUsers({ query, page });
    const currentUser = await getCurrentUser();

    const sentFriendRequests = currentUser?.sentFriendRequests || [];
    const receivedFriendRequests = currentUser?.receivedFriendRequests || [];

    return (
        <div className="space-y-4">
            {users.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {users.map((user: TUser) => (
                        <User key={user.id} user={user} sentFriendRequests={sentFriendRequests} receivedFriendRequests={receivedFriendRequests} />
                    ))}
                </div>
            ) : (
                <p className="text-center font-medium text-zinc-400">No users found</p>
            )}

            {totalPages > 1 && (
                <Pagination totalPages={totalPages} />
            )}
        </div>
    );
}