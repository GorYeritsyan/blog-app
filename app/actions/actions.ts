"use server";

import { redirect } from "next/navigation";
import { type TBlogPost } from "@/app/types/types";
import { fetchInstance } from "@/app/actions/index";

// Fetch all blog posts and filter
export const fetchBlogPosts = async ({ query, page }: { query?: string; page?: number }) => {
    const limit = 2;
    const searchParams = new URLSearchParams({ sortBy: "createdAt", order: "desc" });

    // Filter by title - (search)
    if (query) {
        searchParams.set("search", query);
        // searchParams.set("content", query as string);
    } else {
        searchParams.delete("search");
        // searchParams.delete("content");
    }

    // All blog posts
    const blogPosts = await fetchInstance<TBlogPost[] | "Not found">(`/posts?${searchParams.toString()}`);
    // For paginated Blog Posts
    const totalPages = Math.ceil(blogPosts.length / limit);

    searchParams.set("page", `${page ?? 1}`);
    searchParams.set("limit", `${limit}`);

    const paginatedBlogPosts = await fetchInstance<TBlogPost[] | "Not found">(`/posts?${searchParams.toString()}`);

    return { data: typeof paginatedBlogPosts !== "string" ? paginatedBlogPosts : [], totalPages };
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
export const createBlogPost = async (_: unknown, formData: FormData) => {
    const { title, content, author } = Object.fromEntries(formData);

    const createdBlogPost = await fetchInstance("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author, createdAt: new Date(Date.now()) })
    });

    if (!createdBlogPost) {
        return { message: "Something went wrong when creating the blog post" };
    }

    redirect("/");
}

export const saveBlogPost = async (_: unknown, formData: FormData, postId: string) => {
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
