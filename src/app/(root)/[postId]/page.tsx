import { Suspense } from "react";
import { Metadata } from "next";

import { fetchBlogPostById, fetchBlogPosts } from "@/src/actions/actions";
import Container from "@/src/components/shared/Container";
import BackButton from "@/src/components/shared/BackButton";
import BlogPostDetailsSkeleton from "@/src/components/shared/skeletons/BlogPostDetailsSkeleton";
import BlogPostDetails from "@/src/components/shared/BlogPostDetails";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ postId: string }>}): Promise<Metadata> {
    const { postId } = await params;

    const { title, content } = await fetchBlogPostById(postId);

    return { title, description: content };
}

// Generate first page statically at build time
// export async function generateStaticParams() {
//     const { data: blogPosts } = await fetchBlogPosts({});
//
//     return blogPosts.map(post => ({ postId: post.id }));
// }

export default async function Page({ params }: { params: Promise<{ postId: string }>}) {
    const { postId } = await params;

    return (
        <section>
            <Container>
                <div className="py-8">
                    <div className="flex items-start gap-10">
                        <BackButton />
                        <Suspense fallback={<BlogPostDetailsSkeleton />}>
                            <BlogPostDetails postId={postId} />
                        </Suspense>
                    </div>
                </div>
            </Container>
        </section>
    );
}