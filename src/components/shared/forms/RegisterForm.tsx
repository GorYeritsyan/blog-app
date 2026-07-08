"use client";

import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type RegisterFormValues, RegisterSchema } from "@/lib/validations/auth";
import { registerUser } from "@/actions/auth";
import FormField from "@/components/shared/forms/FormField";

import { FieldGroup } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";

const formFields: { name: "name" | "email" | "password" | "confirmPassword"; label?: string; type?: string }[] = [
    {
        name: "name",
        label: "Full Name"
    },
    {
        name: "email",
    },
    {
        name: "password",
        type: "password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
    }
];

export default function RegisterForm() {
    const [error, registerAction, isPending] = useActionState(registerUser, undefined);
    const errors = error?.details;

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error]);

    const form = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = async (values: RegisterFormValues) => {
        startTransition(async () => {
            registerAction(values);
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-100">
            <FieldGroup className="gap-4">
                {/* Register Form Fields */}
                {formFields.map(formField => (
                    <FormField
                        key={formField.name}
                        name={formField.name}
                        {...(formField.label && { label: formField.label })}
                        control={form.control}
                        errors={errors}
                        render={({ field, fieldState, isInvalid }) => (
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={isInvalid}
                                className="py-1.5 h-fit"
                                {...(formField.type && { type: formField.type })}
                            />
                        )}
                    />
                ))}

                {/* If something went wrong in the server */}
                {/*{error && (*/}
                {/*    <p className="text-red-600 font-medium">{error.message}</p>*/}
                {/*)}*/}

                <Button size="lg" disabled={isPending} type="submit" className="w-full text-base">
                    {isPending ? <Spinner className="size-5" /> : "Register"}
                </Button>
            </FieldGroup>
        </form>
    );
}