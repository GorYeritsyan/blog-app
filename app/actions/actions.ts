"use server";

import { type TBlogPost } from "@/app/types/types";
import { fetchInstance } from "@/app/actions/index";

// Fetch all blog posts and filter
export const fetchBlogPosts = async (query?: string | string[]) => {
    let blogPosts = await fetchInstance<TBlogPost[]>("/posts");

    if (query && typeof query === "string") {
        blogPosts = blogPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())
            || post.content.toLowerCase().includes(query.toLowerCase()));
    }

    return blogPosts;
}

// Fetch blog post by ID
export const fetchBlogPostById = async (postId: string): Promise<TBlogPost> => {
    return await fetchInstance(`/posts/${postId}`);
}

// Delete blog post by ID
export const deleteBlogPost = async (postId: string): Promise<TBlogPost> => {
    return await fetchInstance(`/posts/${postId}`, {
        method: "DELETE",
    });
}
