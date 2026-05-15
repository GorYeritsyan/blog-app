"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ApiResponse } from "@/src/types/types";

export const fetchInstance = async <T = ApiResponse>(endpoint: string, options?: RequestInit): Promise<T> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const headers = new Headers(options?.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`http://localhost:8080/api${endpoint}`, {
        ...options,
        headers
    });


    // TODO: Check this logic
    if (token && res.status == 401) {
        // await logout();
        redirect("/api/logout");
    }

    return await res.json();
}