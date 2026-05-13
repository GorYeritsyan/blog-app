"use client";

import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "@/src/utils/utils";
import { tv } from "tailwind-variants";

const button = tv({
    base: "font-semibold px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-center gap-3 active:translate-y-px duration-100",
    variants: {
        color: {
            primary: "bg-zinc-900 hover:bg-zinc-800 text-white",
            ghost: "text-zinc-900 bg-transparent hover:bg-zinc-100",
            danger: "text-red-600 bg-red-100 hover:bg-red-200",
            outline: "border border-gray-200 bg-white hover:bg-zinc-100 text-zinc-600"
        },
        disabled: {
            true: "opacity-50 pointer-events-none",
        }
    }
});

export type TButtonVariants = "primary" | "ghost" | "danger" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: TButtonVariants;
    className?: string;
}

export default function Button({ children, variant = "primary", disabled, className, ...props }: ButtonProps) {
    return (
        <button
            // className={cn("bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-3 active:translate-y-px duration-100", className)}
            className={cn(button({ color: variant, disabled }), className)}
            {...props}
        >
            {children}
        </button>
    );
}