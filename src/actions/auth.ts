"use server";

import { redirect } from "next/navigation";
import { fetchInstance } from "@/src/actions/index";
import { tryCatch } from "@/src/utils/utils";
import { type ApiResponse, type TUser } from "@/src/types/types";
import { cookies } from "next/headers";

export const registerUser = async (prevState: any, formData: FormData) => {
    const { name, email, password, confirmPassword } = Object.fromEntries(formData);

    // Validate Form Data using Zod

    const { data, error } = await tryCatch<ApiResponse<TUser>>(fetchInstance(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    }));

    // If there is any error during try/catch
    if (error) return { message: error.message };

    // If there is response but with error field
    if (!data.success) return { message: data.error };

    console.log("registeredUser", data);

    redirect("/login");
}

export const loginUser = async (prevState: any, formData: FormData) => {
    const cookieStore = await cookies();
    const { email, password } = Object.fromEntries(formData);

    // Validate fields

    const { data, error } = await tryCatch<ApiResponse>(fetchInstance(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }));

    // If there is any error during try/catch
    if (error) return { message: error.message };

    // If there is response but with error field
    if (!data.success) return { message: data.error };

    // Set access token in the cookies - 15m
    cookieStore.set("token", data.token!, { httpOnly: true, maxAge: 15 * 60 });
    // console.log("Refresh token", cookieStore.get("refreshToken"));

    redirect("/");
}