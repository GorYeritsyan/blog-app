import BlogForm from "@/components/shared/BlogForm";
import { TBlogAction } from "@/types/types";
import { fetchBlogPostById } from "@/actions/actions";

export default async function Page({ params }: { params: Promise<{ action: TBlogAction; postId: string }>}) {
    const { postId } = await params;
    const blogPost = await fetchBlogPostById(postId);

    return (
        <BlogForm blogPost={blogPost} />
    );
}