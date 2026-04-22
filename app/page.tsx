import BlogPost from "@/app/components/shared/BlogPost";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/shared/Container";
import { type TBlogPost } from "@/app/types/types";
import Link from "next/link";
import Search from "@/app/components/shared/Search";

export default async function Home(props: PageProps<"/">) {
    const { query } = await props.searchParams;

    let blogPosts: TBlogPost[] = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts`)
        .then(res => res.json());

    console.log("q", query);
    if (query && typeof query === "string") {
        blogPosts = blogPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())
        || post.content.toLowerCase().includes(query.toLowerCase()));
    }

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
                            <div className="flex flex-col *:last:border-none">
                                {blogPosts.map(post => (
                                    <BlogPost key={post.id} post={post} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}