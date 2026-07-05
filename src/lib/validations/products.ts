import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const ProductSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.coerce.number().positive("Price must be greater than 0").min(10, "Price must be greater than 10"),
    image: z
        .instanceof(File, { error: "Image is required" })
        .refine(file => !file || file.size <= MAX_FILE_SIZE, "Image must be smaller than 5MB")
        .refine(file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Unsupported file format"),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;