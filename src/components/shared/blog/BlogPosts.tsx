
import BlogPost from "@/components/shared/blog/BlogPost";
import Pagination from "@/components/ui/pagination";
import { fetchBlogPosts } from "@/actions/actions";

export default async function BlogPosts({ query, page }: { query: string; page: number }) {
    const { data: blogPosts, totalPages } = await fetchBlogPosts({ query, page });

    return (
        <>
            {blogPosts.length > 0 ? (
                <div className="flex flex-col *:last:border-none">
                    {blogPosts.map(post => (
                        <BlogPost key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center font-medium text-zinc-400">There is no blog posts</p>
            )}

            {!!totalPages && blogPosts.length > 0 && (
                <Pagination totalPages={totalPages} />
            )}
        </>
    );
}