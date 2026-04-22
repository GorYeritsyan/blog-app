"use client";

import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "@/app/utils/utils";
import { tv } from "tailwind-variants";

const button = tv({
    base: "font-semibold px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-3 active:translate-y-px duration-100",
    variants: {
        color: {
            primary: "bg-zinc-900 hover:bg-zinc-800 text-white",
            ghost: "text-zinc-900 bg-transparent hover:bg-zinc-100",
            danger: "text-red-600 bg-red-100 hover:bg-red-200",
            outline: "border border-gray-200 bg-white hover:bg-zinc-100 text-zinc-600"
        }
    }
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: "primary" | "ghost" | "danger" | "outline";
    className?: string;
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
    return (
        <button
            // className={cn("bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-3 active:translate-y-px duration-100", className)}
            className={cn(button({ color: variant }), className)}
            {...props}
        >
            {children}
        </button>
    );
}