"use server";

import { redirect } from "next/navigation";
import { fetchInstance } from "@/src/actions/index";
import { tryCatch } from "@/src/utils/utils";
import { type TUser } from "@/src/types/types";
import { type LoginFormValues, LoginSchema, type RegisterFormValues, RegisterSchema } from "@/src/lib/validations/auth";
import {InvalidLoginError, signIn, signOut} from "@/auth";
import {CredentialsSignin} from "next-auth";

export const registerUser = async (prevState: { message: string } | undefined, formValues: RegisterFormValues) => {
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

    redirect("/login");
}

export const loginUser = async (prevState: { message: string } | undefined, formValues: LoginFormValues) => {
    const result = LoginSchema.safeParse(formValues);

    if (!result.success) {
        return { message: "Invalid data" };
    }

    const { email, password } = result.data;

    // TODO: Check redirection logic
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof CredentialsSignin) {
            return { message: error.code };
        }
        throw error;
    }
}

export const logout = async () => {
    await signOut({ redirectTo: "/login" });
}

// GET auth user details
export const getCurrentUser = async () => {
    const { data } = await tryCatch<TUser>(fetchInstance("/auth/me"));
    return data?.data;
}