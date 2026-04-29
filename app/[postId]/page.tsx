import { Suspense } from "react";
import { Metadata } from "next";

import Container from "@/app/components/shared/Container";
import BackButton from "@/app/components/shared/BackButton";
import { fetchBlogPostById, fetchBlogPosts } from "@/app/actions/actions";
import BlogPostDetailsSkeleton from "@/app/components/shared/skeletons/BlogPostDetailsSkeleton";
import BlogPostDetails from "@/app/components/shared/BlogPostDetails";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ postId: string }>}): Promise<Metadata> {
    const { postId } = await params;

    const { title, content } = await fetchBlogPostById(postId);

    return { title, description: content };
}

export async function generateStaticParams() {
    const blogPosts = await fetchBlogPosts();

    return blogPosts.map(post => ({ postId: post.id }));
}

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