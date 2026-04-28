"use client";

import { createContext, type ReactNode, useContext, useRef, type FormHTMLAttributes } from "react";

type TFormContext = {
    errors?: { [key: string]: string } | null;
    defaultValues?: { [key: string]: string };
    handleChange?: (key: string, value: string) => void;
}

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    children: ReactNode;
    errors: { [key: string]: string } | null;
    defaultValues: { [key: string]: string };
    className?: string;
}

const FormContext = createContext<TFormContext>({});

export default function Form({ children, errors, className, defaultValues, ...props }: FormProps) {
    const formRef = useRef<{ [key: string]: string }>({});

    const handleChange = (key: string, value: string) => {
        formRef.current[key] = value;
    }

    return (
        <FormContext.Provider value={{ errors, defaultValues, handleChange }}>
            <form className={className} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext);

    if (!context) throw new Error('useForm must be used within Form');

    return context;
}