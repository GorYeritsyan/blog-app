import Link from "next/link";

import Button from "@/app/components/ui/Button";
import Container from "@/app/components/shared/Container";
import Search from "@/app/components/shared/Search";
import BlogPosts from "@/app/components/shared/BlogPosts";

export default async function Home(props: PageProps<"/">) {
    const { query, page = 1 } = await props.searchParams;

    return (
        <section>
            <Container>
                <div className="py-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-4xl font-bold">Blog Posts</h1>
                            <Link href="/blog/create">
                                <Button>Create Post</Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Search />

                            {/* Blog Posts */}
                            <BlogPosts query={query as string} page={+page} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}