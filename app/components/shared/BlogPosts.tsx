import BlogPost from "@/app/components/shared/BlogPost";
import Index from "@/app/components/ui/pagination";
import { fetchBlogPosts } from "@/app/actions/actions";

export default async function BlogPosts({ query, page }: { query: string; page: number }) {
    const blogPosts= await fetchBlogPosts(query);

    const limit = 2;
    const totalPages = Math.ceil(blogPosts.length / limit);
    const paginatedBlogPosts = [...blogPosts].slice((+page - 1) * limit, +page * limit);

    return (
        <>
            {paginatedBlogPosts.length > 0 ? (
                <div className="flex flex-col *:last:border-none">
                    {paginatedBlogPosts.map(post => (
                        <BlogPost key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center font-medium text-zinc-400">There is no blog posts</p>
            )}

            <Index totalPages={totalPages} />
        </>
    );
}