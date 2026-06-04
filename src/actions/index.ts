import { redirect } from "next/navigation";
import { ApiResponse } from "@/types/types";
import { auth } from "@/auth";

export const fetchInstance = async <T = ApiResponse>(endpoint: string, options?: RequestInit): Promise<T> => {
    const token = (await auth())?.accessToken;
    const headers = new Headers(options?.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`http://localhost:8080/api${endpoint}`, {
        ...options,
        headers
    });

    // If there is session but accessToken inside that session is expired then redirect to login page
    // Must throw error in try/catch, otherwise redirect won't work
    if (res.status === 401) {
        redirect("/api/logout");
    }

    return await res.json();
}