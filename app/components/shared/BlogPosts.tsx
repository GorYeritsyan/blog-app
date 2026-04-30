import BlogPost from "@/app/components/shared/BlogPost";
import Pagination from "@/app/components/ui/pagination";
import { fetchBlogPosts } from "@/app/actions/actions";

export default async function BlogPosts({ query, page }: { query: string; page: number }) {
    const limit = 2;
    const { data: blogPosts, totalPages }= await fetchBlogPosts({ query, page, limit });

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

            <Pagination totalPages={totalPages} />
        </>
    );
}