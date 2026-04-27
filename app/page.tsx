import BlogPost from "@/app/components/shared/BlogPost";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import Search from "@/app/components/shared/Search";
import { fetchBlogPosts } from "@/app/actions/actions";
import Pagination from "@/app/components/ui/pagination/Pagination";

export default async function Home(props: PageProps<"/">) {
    const { query, page = 1 } = await props.searchParams;
    const limit = 2;
    const blogPosts= await fetchBlogPosts(query);

    const totalPages = Math.ceil(blogPosts.length / limit);
    const paginatedBlogPosts = [...blogPosts].slice((+page - 1) * limit, +page * limit);

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
                            {paginatedBlogPosts.length > 0 ? (
                                <div className="flex flex-col *:last:border-none">
                                    {paginatedBlogPosts.map(post => (
                                        <BlogPost key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center font-medium text-zinc-400">There is no blog posts</p>
                            )}
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}