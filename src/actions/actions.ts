"use server";

import { redirect } from "next/navigation";
import { type TBlogPost } from "@/types/types";
import { fetchInstance} from "@/actions/index";
import { tryCatch } from "@/utils/utils";
import { type BlogPostFormValues, BlogPostSchema } from "@/lib/validations/blog";

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
    const { data, error } = await tryCatch<TBlogPost>(fetchInstance(`/blog/${postId}`));

    if (error) console.log(error.message);

    console.log("data", data)
    return data?.data;
}

export const saveOrCreateBlogPost = async (prevState: { message: string } | undefined, values: BlogPostFormValues) => {
    const result = BlogPostSchema.safeParse(values);

    if (!result.success) {
        return { message: "Invalid data" };
    }

    const { title, content, tags, postId } = result.data;

    // Edit blog post
    if (postId) {
        const { error } = await tryCatch<TBlogPost>(fetchInstance(`/blog/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, tags })
        }));

        if (error) {
            return { message: "Something went wrong when updating the blog post" };
        }

        redirect("/");
    }

    // Create blog post
    const { error } = await tryCatch<TBlogPost>(fetchInstance("/blog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data)
    }));

    // If something went wrong in the server
    if (error) {
        return {message: "Something went wrong when creating the blog post"};
    }

    redirect("/");
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