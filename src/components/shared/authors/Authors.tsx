import { getAllUsers } from "@/src/actions/users";
import Pagination from "@/src/components/ui/pagination";
import Author from "@/src/components/shared/authors/Author";
import { TUser } from "@/src/types/types";
import { getCurrentUser } from "@/src/actions/auth";

export default async function Authors({ query, page }: { query?: string; page: number }) {
    const { data: users, totalPages } = await getAllUsers({ query, page });
    const currentUser = await getCurrentUser();
    const sentFriendRequests = currentUser?.sentFriendRequests || [];

    return (
        <div className="space-y-4">
            {users.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {users.map((user: TUser) => (
                        <Author key={user.id} author={user} sentFriendRequests={sentFriendRequests} />
                    ))}
                </div>
            ) : (
                <p className="text-center font-medium text-zinc-400">No authors found</p>
            )}

            {totalPages > 1 && (
                <Pagination totalPages={totalPages} />
            )}
        </div>
    );
}