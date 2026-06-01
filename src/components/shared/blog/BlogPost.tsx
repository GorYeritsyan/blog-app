import Link from "next/link";

import { type TBlogPost } from "@/types/types";
import DeleteModalButton from "@/components/shared/DeleteModalButton";
import { getCurrentUser } from "@/actions/auth";
import { Button } from "@/components/shadcn/button";
import Tags from "@/components/shared/blog/Tags";

export default async function BlogPost({ post }: { post: TBlogPost }) {
    const date = new Date(post.createdAt).toDateString();
    const currentUser = await getCurrentUser();

    return (
        <div className="flex flex-col gap-4 px-6 py-4 hover:bg-zinc-50 border-b border-b-zinc-200">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-6">
                    <p className="text-zinc-400">Published <span>{date}</span></p>
                    {post?.tags && post.tags.length > 0 && (
                        <Tags limit={6} tags={post.tags} />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Link className="text-2xl font-semibold hover:underline capitalize" href={`/${post.id}`}>
                        {post.title}
                    </Link>
                    <p className="text-gray-500">{post.content}</p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-gray-400">
                    Created by <span className="font-medium text-zinc-900">{post?.author?.name}</span>
                </p>

                {/* Show edit and delete buttons if current user same post author */}
                {currentUser?.id === post?.authorId && (
                    <div className="flex items-center gap-2">
                        <Link href={`/blog/edit/${post.id}`}>
                            <Button size="lg" className="text-base px-3">Edit</Button>
                        </Link>

                        {/* Modal Button to delete blog post */}
                        <DeleteModalButton postId={post.id} />
                    </div>
                )}
            </div>
        </div>
    );
}