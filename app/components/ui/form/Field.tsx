"use client";

import { createContext, ReactNode, useContext } from "react";
import { useForm } from "@/app/components/ui/form/Form";

type TFieldContext = {
    name?: string;
    defaultValue?: string;
    errors?: { [key: string]: string } | null;
}

type FieldProps = {
    children: ReactNode;
    label: string;
    name: string;
}

const FieldContext = createContext<TFieldContext>({});

export default function Field({ children, label, name }: FieldProps) {
    const { errors, defaultValues } = useForm();

    return (
        <FieldContext.Provider value={{ name, errors, defaultValue: defaultValues?.[name] }}>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor={name} className="font-semibold">{label}</label>
                {children}
                {/*<Input id={name} name={name} defaultValue={blogPost?.title ?? ""} />*/}
                {errors?.[name] && (
                    <p className="text-red-600 font-medium">{errors?.[name]}</p>
                )}
            </div>
        </FieldContext.Provider>
    );
}

export const useField = () => useContext(FieldContext);