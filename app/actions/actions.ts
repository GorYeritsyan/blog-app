"use server";

import { type TBlogPost } from "@/app/types/types";

// Fetch all blog posts and filter
export const fetchBlogPosts = async (query?: string | string[]) => {
    const res = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts`)
    let blogPosts: TBlogPost[] = await res.json();

    if (query && typeof query === "string") {
        blogPosts = blogPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())
            || post.content.toLowerCase().includes(query.toLowerCase()));
    }

    return blogPosts;
}

// Fetch blog post by ID
export const fetchBlogPostById = async (postId: string): Promise<TBlogPost> => {
    const res = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts/${postId}`);
    return await res.json();
}

// Delete blog post by ID
export const deleteBlogPost = async (postId: string): Promise<TBlogPost> => {
    const res = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts/${postId}`, {
        method: "DELETE"
    });

    return await res.json();
}
