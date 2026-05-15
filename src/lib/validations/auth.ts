import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, "This field is required").min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(1, "This field is required").regex(/^[a-zA-Z0-9]{3,30}$/, "Password is invalid"),
    confirmPassword: z.string().min(1, "This field is required")
})
    .refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export const LoginSchema = z.object({
    email: z.email("Email is invalid"),
    password: z.string().regex(/^[a-zA-Z0-9]{3,30}$/, "Password is invalid"),
});

// Form values types
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type LoginFormValues = z.infer<typeof LoginSchema>;