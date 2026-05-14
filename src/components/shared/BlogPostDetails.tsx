import { fetchBlogPostById } from "@/src/actions/actions";

export default async function BlogPostDetails({ postId }: { postId: string }) {
    const blogPost = await fetchBlogPostById(postId);
    const date = new Date(blogPost?.createdAt).toDateString();

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3 items-center text-center w-full">
                <h1 className="capitalize self-center text-4xl font-semibold">{blogPost?.title}</h1>

                <span className="text-zinc-400">Published {date}</span>

                <p className="text-gray-400">
                    Created by <span className="font-medium text-zinc-900">{blogPost?.author?.name}</span>
                </p>
            </div>

            <p className="leading-tight text-lg text-center">{blogPost?.content}</p>
        </div>
    );
}