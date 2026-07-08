import { z } from "zod";

export const BlogPostSchema = z.object({
    title: z.string().min(1, "This field is required").max(40, "Title must be at most 40 characters").trim(),
    content: z.string().min(1, "This field is required").trim(),
    tags: z.array(z.string()),
    postId: z.number().optional(),
});

export type BlogPostFormValues = z.infer<typeof BlogPostSchema>;