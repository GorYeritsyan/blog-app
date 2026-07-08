import { fetchBlogPostById } from "@/actions/actions";
import Tags from "@/components/shared/blog/Tags";

export default async function BlogPostDetails({ postId }: { postId: string }) {
    const blogPost = await fetchBlogPostById(postId);
    const date = typeof blogPost !== "undefined" && new Date(blogPost.createdAt).toDateString();

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3 items-center text-center w-full">
                <h1 className="capitalize self-center text-4xl font-semibold">{blogPost?.title}</h1>

                <span className="text-zinc-400">Published {date}</span>

                <p className="text-gray-400">
                    Created by <span className="font-medium text-zinc-900">{blogPost?.author?.name}</span>
                </p>

                <div className="max-w-120">
                    {blogPost?.tags && blogPost.tags.length > 0 && (
                        <Tags tags={blogPost.tags} />
                    )}
                </div>
            </div>

            <p className="leading-tight text-lg text-center">{blogPost?.content}</p>
        </div>
    );
}