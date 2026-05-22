import { getAllUsers } from "@/src/actions/users";
import Pagination from "@/src/components/ui/pagination";
import Author from "@/src/components/shared/authors/Author";
import { TUser } from "@/src/types/types";

export default async function Authors({ query, page }: { query?: string; page: number }) {
    const { data: users, totalPages } = await getAllUsers({ query, page });

    return (
        <div>
            {users.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {users.map((user: TUser) => (
                        <Author key={user.id} author={user} />
                    ))}
                </div>
            ) : (
                <p>There is no user</p>
            )}

            {totalPages > 1 && (
                <Pagination totalPages={totalPages} />
            )}
        </div>
    );
}