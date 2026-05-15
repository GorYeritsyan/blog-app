"use server";

import { redirect } from "next/navigation";
import { fetchInstance } from "@/src/actions/index";
import { tryCatch } from "@/src/utils/utils";
import { type TUser } from "@/src/types/types";
import { cookies } from "next/headers";
import { type LoginFormValues, LoginSchema, type RegisterFormValues, RegisterSchema } from "@/src/lib/validations/auth";

export const registerUser = async (prevState: any, formValues: RegisterFormValues) => {
    // Validate Form Data using Zod
    const result = RegisterSchema.safeParse(formValues);

    // Handle error
    if (!result.success) {
        return { errors: "Invalid data" };
    }

    // Get form values
    const { name, email, password } = result.data;

    // Create user
    const { error } = await tryCatch<TUser>(fetchInstance(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    }));

    // If there is any error during try/catch
    if (error) return { message: error.message };
    // console.log("registeredUser", data);

    redirect("/login");
}

export const loginUser = async (prevState: any, formValues: LoginFormValues) => {
    const cookieStore = await cookies();

    // Validate fields
    const result = LoginSchema.safeParse(formValues);

    if (!result.success) {
        return { errors: "Invalid data" };
    }

    const { email, password } = result.data;

    const { data, error } = await tryCatch(fetchInstance(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }));

    // If there is any error during try/catch
    if (error) return { message: error.message };

    // Set access token in the cookies - 15m
    cookieStore.set("token", data.token!, { httpOnly: true, maxAge: 15 * 60 });
    // console.log("Refresh token", cookieStore.get("refreshToken"));

    redirect("/");
}

export const logout = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    redirect("/login");
}

// GET auth user details
export const getCurrentUser = async () => {
    const { data } = await tryCatch<TUser>(fetchInstance("/auth/me"));

    return data?.data;
}