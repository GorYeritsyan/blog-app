import { twMerge } from "tailwind-merge";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import clsx, { type ClassValue } from "clsx";

import { ApiResponse, ApiSuccess, TFriendRequestStatus } from "@/types/types";

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
        // In case if error is NEXT_REDIRECT (redirect) throw error
        if (isRedirectError(error)) throw error;
        return { data: null, error: error as E };
    }
}

// Utility function to return current friendship status
export const getFriendStatus = (status: Lowercase<TFriendRequestStatus>) => {
    switch (status) {
        case "pending":
            return "pending";
        case "accepted":
            return "friends";
        default:
            return "add friend";
    }
}