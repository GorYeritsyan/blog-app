"use client";

import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
import { cn } from "@/app/utils/utils";
import { useField } from "@/app/components/ui/form/Field";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
};

export default function Textarea({ className, ...props }: TextareaProps) {
    const { name, errors, defaultValue } = useField();
    const [value, setValue] = useState(defaultValue ?? "");

    function changeTextareaValue(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
    }

    return (
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={changeTextareaValue}
            className={cn("px-3 py-1.5 rounded-lg border border-zinc-300 outline-none focus:border-zinc-500 focus:ring-3 focus:ring-zinc-300 transition-border duration-200",
                errors?.[name as string] && "border-red-500 focus:border-red-600 focus:ring-red-300",
                className
            )}
            {...props}
        />
    );
}