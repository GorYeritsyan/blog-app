import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const cn = (...classNames: ClassValue[]) => {
    return twMerge(clsx(...classNames));
}