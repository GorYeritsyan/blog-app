"use client";

import Link from "next/link";

import { type TBlogPost } from "@/src/types/types";
import Button from "@/src/components/ui/Button";
import DeleteModalButton from "@/src/components/shared/DeleteModalButton";

export default function BlogPost({ post }: { post: TBlogPost }) {
    const date = new Date(post.createdAt).toDateString();

    return (
        <div className="flex flex-col gap-4 px-6 py-4 hover:bg-zinc-50 border-b border-b-zinc-200">
            <div className="flex flex-col gap-1">
                <p className="text-zinc-400">Published <span>{date}</span></p>

                <div className="flex flex-col gap-3">
                    <Link className="text-2xl font-semibold hover:underline capitalize" href={`/${post.id}`}>
                        {post.title}
                    </Link>
                    <p className="text-gray-500">{post.content}</p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <p className="text-gray-400">
                    Created by <span className="font-medium text-zinc-900">{post.author}</span>
                </p>

                <div className="flex gap-2">
                    <Link href={`/blog/edit/${post.id}`}>
                        <Button>Edit</Button>
                    </Link>

                    {/* Modal Button to delete blog post */}
                    <DeleteModalButton postId={post.id} />
                </div>
            </div>
        </div>
    );
}