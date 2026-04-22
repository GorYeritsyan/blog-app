import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import type { TBlogPost } from "@/app/types/types";

export const cn = (...classNames: ClassValue[]) => {
    return twMerge(clsx(...classNames));
}