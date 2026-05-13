"use server";

import { redirect } from "next/navigation";
import { type TBlogPost, type TPagination } from "@/src/types/types";
import { fetchInstance } from "@/src/actions/index";
import {cookies} from "next/headers";

// Fetch all blog posts and filter
export const fetchBlogPosts = async ({ query, page }: { query?: string; page?: number }) => {
    const limit = 4;
    const searchParams = new URLSearchParams();

    // Filter by title - (search)
    if (query) {
        searchParams.set("query", query);
    } else {
        searchParams.delete("query");
    }

    // Pagination
    searchParams.set("page", `${page ?? 1}`);
    searchParams.set("limit", `${limit}`);

    // All blog posts
    const { data: blogPosts, pagination } = await fetchInstance<{ data: TBlogPost; pagination: TPagination }>(`/blog?${searchParams.toString()}`);

    return { data: typeof blogPosts !== "string" ? blogPosts : [], totalPages: pagination.totalPages };
}

// Fetch blog post by ID
export const fetchBlogPostById = async (postId: string): Promise<TBlogPost> => {
    return await fetchInstance(`/blog/${postId}`);
}

// Delete blog post by ID
export const deleteBlogPost = async (postId: string): Promise<TBlogPost> => {
    await fetchInstance(`/blog/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    redirect("/");
}

// Create & Edit Blog Post Server Actions
export const createBlogPost = async (formData: FormData) => {
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

export const saveBlogPost = async (formData: FormData, postId: string) => {
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