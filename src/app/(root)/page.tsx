import Link from "next/link";

import Search from "@/components/shared/Search";
import BlogPosts from "@/components/shared/blog/BlogPosts";
import { Button } from "@/components/shadcn/button";

export default async function Home(props: PageProps<"/">) {
    const { query, page = 1 } = await props.searchParams;

    return (
        <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-4xl font-semibold">Posts</h1>
                <Link href="/blog/create">
                    <Button size="lg" className="px-3">Create Post</Button>
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                <Search placeholder="Search for blog posts..." />

                {/* Blog Posts */}
                <BlogPosts query={query as string} page={+page} />
            </div>
        </section>
    );
}