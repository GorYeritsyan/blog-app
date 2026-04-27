import BlogForm from "@/app/components/shared/BlogForm";
import { TBlogAction } from "@/app/types/types";
import { fetchBlogPostById } from "@/app/actions/actions";

export default async function Page({ params }: { params: Promise<{ action: TBlogAction; postId: string }>}) {
    const { postId } = await params;
    const blogPost = await fetchBlogPostById(postId);

    return (
        <BlogForm blogPost={blogPost} />
    );
}