import Search from "@/components/shared/Search";
import Users from "@/components/shared/users/Users";

export default async function UsersPage({ searchParams }: PageProps<"/users">) {
    const { query, page = "1" } = await searchParams;

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Users to connect</h1>

            <div className="flex flex-col gap-4">
                <Search placeholder="Search for users..." />

                {/* Users */}
                <Users query={query as string} page={+page} />
            </div>
        </section>
    )
}