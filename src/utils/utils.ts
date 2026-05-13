import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import {ApiResponse} from "@/src/types/types";

export const cn = (...classNames: ClassValue[]) => {
    return twMerge(clsx(...classNames));
}

// tryCatch Utility function to not use try/catch block everywhere
type Failure<E> = { data: null; error: E };
type Success<T> = { data: T, error: null };

type Result<T, E = Error> = Success<T> | Failure<E>;

export const tryCatch = async <T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> => {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}