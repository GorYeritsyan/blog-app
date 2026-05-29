"use client";

import { createContext, ReactNode, useContext } from "react";
import { useForm } from "@/components/ui/form/Form";

type TFieldContext = {
    errors?: { [key: string]: string } | null;
}

type FieldProps = {
    children: ReactNode;
    label: string;
    name: string;
}

const FieldContext = createContext<TFieldContext>({});

export default function Field({ children, label, name }: FieldProps) {
    const { errors } = useForm();

    return (
        <FieldContext.Provider value={{ errors }}>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor={name} className="font-semibold">{label}</label>
                {children}
                {errors?.[name] && (
                    <p className="text-red-600 font-medium">{errors?.[name]?.message}</p>
                )}
            </div>
        </FieldContext.Provider>
    );
}

export const useField = () => useContext(FieldContext);