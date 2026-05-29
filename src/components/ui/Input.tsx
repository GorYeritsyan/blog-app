"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/utils";
import { useField } from "@/components/ui/form/Field";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

export default function Input({ className, ...props }: InputProps) {
    const { errors } = useField();

    return (
        <input
            id={props.name}
            className={cn("px-3 py-1.5 rounded-lg border border-zinc-300 outline-none focus:border-zinc-500 focus:ring-3 focus:ring-zinc-300 transition-all duration-200",
                errors?.[props.name as string] && "border-red-500 focus:border-red-600 focus:ring-red-300",
                className
            )}
            {...props}
        />
    );
}