import { z } from "zod";

export const ProductSchema = z.object({
    title: z.string().min(1, "This field is required"),
    price: z.coerce.number().min(100, "Price must be greater than 100"),
});

export type ProductFormValues = z.infer<typeof ProductSchema>;