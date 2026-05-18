"use server";

import { ApiResponse } from "@/src/types/types";
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

    return await res.json();
}