import { Suspense } from "react";
import { Metadata } from "next";

import { fetchBlogPostById } from "@/actions/actions";
import BackButton from "@/components/shared/BackButton";
import BlogPostDetailsSkeleton from "@/components/shared/skeletons/BlogPostDetailsSkeleton";
import BlogPostDetails from "@/components/shared/blog/BlogPostDetails";
import { TBlogPost } from "@/types/types";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ postId: string }>}): Promise<Metadata> {
    const { postId } = await params;

    // TODO: Check type safety
    const { title, content } = await fetchBlogPostById(postId) as TBlogPost;

    return { title, description: content };
}

// Generate first page statically at build time
// export async function generateStaticParams() {
//     const { data: blogPosts } = await fetchBlogPosts({ page: 1 });
//
//     return blogPosts.map(post => ({ postId: post.id }));
// }

export default async function Page({ params }: { params: Promise<{ postId: string }>}) {
    const { postId } = await params;

    return (
        <section className="flex items-start gap-10">
            <BackButton />
            <Suspense fallback={<BlogPostDetailsSkeleton />}>
                <BlogPostDetails postId={postId} />
            </Suspense>
        </section>
    );
}