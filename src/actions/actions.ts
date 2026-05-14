"use server";

import { redirect } from "next/navigation";
import {ApiResponse, type TBlogPost, type TPagination} from "@/src/types/types";
import { fetchInstance } from "@/src/actions/index";
import {tryCatch} from "@/src/utils/utils";
import {getMe} from "@/src/actions/auth";

// Fetch all blog posts and filter
export const fetchBlogPosts = async ({ query, page = 1 }: { query?: string; page?: number }) => {
    const limit = 4;
    const searchParams = new URLSearchParams();

    // Filter by title - (search)
    if (query) {
        searchParams.set("query", query);
    } else {
        searchParams.delete("query");
    }

    // Pagination
    searchParams.set("page", `${page}`);
    searchParams.set("limit", `${limit}`);

    // All blog posts
    const { data, error } = await tryCatch<TBlogPost[]>(fetchInstance(`/blog?${searchParams.toString()}`));

    if (error) console.log(error.message);

    return { data: data?.data || [], totalPages: data?.pagination?.totalPages };
}

// Fetch blog post by ID
export const fetchBlogPostById = async (postId: string) => {
    const { data, error } = await tryCatch(fetchInstance(`/blog/${postId}`));

    if (error) console.log(error.message);

    return data?.data;
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
    const { title, content } = Object.fromEntries(formData);
    const user = await getMe();

    const createdBlogPost = await fetchInstance("/blog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, authorId: user?.id })
    });

    if (!createdBlogPost) {
        return { message: "Something went wrong when creating the blog post" };
    }

    redirect("/");
}

export const saveBlogPost = async (formData: FormData, postId: string) => {
    const { title, content } = Object.fromEntries(formData);
    const user = await getMe();

    const updatedBlogPost = await fetchInstance(`/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, authorId: user?.id })
    });

    if (!updatedBlogPost) {
        return { message: "Something went wrong when updating the blog post" };
    }

    redirect("/");
}