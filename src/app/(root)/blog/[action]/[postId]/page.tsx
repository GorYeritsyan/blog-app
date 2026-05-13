import BlogForm from "@/src/components/shared/BlogForm";
import { TBlogAction } from "@/src/types/types";
import { fetchBlogPostById } from "@/src/actions/actions";

export default async function Page({ params }: { params: Promise<{ action: TBlogAction; postId: string }>}) {
    const { postId } = await params;
    const blogPost = await fetchBlogPostById(postId);

    return (
        <BlogForm blogPost={blogPost} />
    );
}