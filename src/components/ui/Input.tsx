"use client";

import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { cn } from "@/src/utils/utils";
import { useField } from "@/src/components/ui/form/Field";
import { useForm } from "@/src/components/ui/form/Form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

export default function Input({ className, ...props }: InputProps) {
    const { handleChange } = useForm();
    const { name, errors, defaultValue } = useField();
    const [value, setValue] = useState(defaultValue ?? "");

    // function changeInputValue(e: ChangeEvent<HTMLInputElement>) {
    //     setValue(e.target.value);
    //
    //     if (name) {
    //         handleChange?.(name, e.target.value);
    //     }
    // }

    return (
        <input
            id={name}
            // name={name}
            // value={value}
            // onChange={changeInputValue}
            className={cn("px-3 py-1.5 rounded-lg border border-zinc-300 outline-none focus:border-zinc-500 focus:ring-3 focus:ring-zinc-300 transition-all duration-200",
                errors?.[name as string] && "border-red-500 focus:border-red-600 focus:ring-red-300",
                className
            )}
            {...props}
        />
    );
}