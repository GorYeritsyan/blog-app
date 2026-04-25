import BlogPost from "@/app/components/shared/BlogPost";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/shared/Container";
import Link from "next/link";
import Search from "@/app/components/shared/Search";
import { fetchBlogPosts } from "@/app/actions/actions";

export default async function Home(props: PageProps<"/">) {
    const { query } = await props.searchParams;
    const blogPosts= await fetchBlogPosts(query);

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
                            {blogPosts.length > 0 ? (
                                <div className="flex flex-col *:last:border-none">
                                    {blogPosts.map(post => (
                                        <BlogPost key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center font-medium text-zinc-400">There is no blog posts</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}