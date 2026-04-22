"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/app/utils/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn("px-3 py-1.5 rounded-lg border border-zinc-300 outline-none focus:border-zinc-500 focus:ring-3 focus:ring-zinc-300 transition-all duration-200", className)}
            {...props}
        />
    );
}