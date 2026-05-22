import Search from "@/src/components/shared/Search";
import Authors from "@/src/components/shared/authors/Authors";

export default async function AuthorsPage({ searchParams }: PageProps<"/authors">) {
    const { query, page = "1" } = await searchParams;

    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-4xl fon-semibold">Authors to connect</h1>

            <div className="flex flex-col gap-4">
                <Search placeholder="Search for authors..." />

                {/* Authors */}
                <Authors query={query as string} page={+page} />
            </div>
        </section>
    )
}