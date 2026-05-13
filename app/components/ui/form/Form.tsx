"use client";

import { createContext, ReactNode, useContext, SubmitEvent } from "react";

const FormContext = createContext({});

type FormProps = {
    children: ReactNode;
    action: (formValues: any) => void;
}

export default function Form({ children, action }: FormProps) {


    const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formValues = Object.fromEntries(new FormData(e.target));

        console.log(formValues);

        action(formValues);
    }

    return (
        <FormContext.Provider value={{}}>
            <form onSubmit={handleFormSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export const useForm = () => {
    const context = useContext(FormContext);

    if (!context) throw new Error("useForm() must be used within Form");

    return context;
}