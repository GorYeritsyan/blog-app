"use client";

import {createContext, ReactNode, useContext, useRef} from "react";
import {cn} from "@/app/utils/utils";

export const FormContext = createContext({});

type FormProps = {
    children: ReactNode;
    onSubmit: (data: FormData) => void;
}

export default function Form({ children, onSubmit, className }) {
    const formRef = useRef({});

    function handleChange(key, value) {
        formRef.current[key] = value;
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(formRef.current);
    }

    return (
        <FormContext.Provider value={{ handleChange }}>
            <form onSubmit={handleSubmit} className={cn("w-full flex flex-col gap-4", className)}>
                {children}
            </form>
        </FormContext.Provider>

    );
}

export const useForm = () => {
    const context = useContext(FormContext);

    if (!context) throw new Error("useForm must be used within the Form");

    return context;
}