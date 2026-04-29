"use server";

import { redirect } from "next/navigation";
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
    await fetchInstance(`/posts/${postId}`, {
        method: "DELETE",
    });

    redirect("/");
}

// Create & Edit Blog Post Server Actions
export const createBlogPost = async (prevState: { message: string } | undefined, formData: FormData) => {
    const { title, content, author } = Object.fromEntries(formData);

    const createdBlogPost = await fetchInstance("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author })
    });

    if (!createdBlogPost) {
        return { message: "Something went wrong when creating the blog post" };
    }

    redirect("/");
}

export const saveBlogPost = async (prevState: { message: string } | undefined, formData: FormData, postId: string) => {
    const { title, content, author } = Object.fromEntries(formData);

    const updatedBlogPost = await fetchInstance(`/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author })
    });

    if (!updatedBlogPost) {
        return { message: "Something went wrong when updating the blog post" };
    }

    redirect("/");
}
