"use client";

import { createContext, ReactNode, useContext, FormHTMLAttributes } from "react";

type TFormContext = {
    errors?: { [key: string]: string } | null;
}

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
    children: ReactNode;
    errors: { [key: string]: string } | null;
    className?: string;
}

const FormContext = createContext<TFormContext>({});

export default function Form({ children, errors, className, ...props }: FormProps) {
    return (
        <FormContext.Provider value={{ errors }}>
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