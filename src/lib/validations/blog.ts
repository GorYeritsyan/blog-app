import { z } from "zod";

export const BlogPostSchema = z.object({
    title: z.string().min(1, "This field is required"),
    content: z.string().min(1, "This field is required"),
    tags: z.array(z.string()),
    postId: z.number().optional(),
});

export type BlogPostFormValues = z.infer<typeof BlogPostSchema>;