import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import {ApiResponse, ApiSuccess} from "@/src/types/types";

export const cn = (...classNames: ClassValue[]) => {
    return twMerge(clsx(...classNames));
}

// tryCatch Utility function to not use try/catch block everywhere
type Failure<E> = { data: null; error: E };
type Success<T> = { data: ApiSuccess<T>, error: null };

type Result<T, E = Error> = Success<T> | Failure<E>;

export const tryCatch = async <T = never, E = Error>(promise: Promise<ApiResponse<T>>): Promise<Result<T, E>> => {
    try {
        const data = await promise;

        // TODO: Check logic
        // If promise resolved, but don't succeed then return error
        if (!data.success) return { data: null, error: new Error(data.error) as E };

        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}