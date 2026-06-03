"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/actions/auth";
import { type RegisterFormValues, RegisterSchema } from "@/lib/validations/auth";
import FormField from "@/components/shared/forms/FormField";
import {FieldGroup} from "@/components/shadcn/field";
import {Input} from "@/components/shadcn/input";
import {Button} from "@/components/shadcn/button";
import {Spinner} from "@/components/shadcn/spinner";

export default function RegisterForm() {
    const [error, registerAction, isPending] = useActionState(registerUser, undefined);

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
                {/* Name */}
                <FormField
                    name="name"
                    label="Full Name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5 h-fit"
                        />
                    )}
                />

                {/*Email*/}
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5 h-fit"
                        />
                    )}
                />

                {/*Password*/}
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="password"
                            className="py-1.5 h-fit"
                        />
                    )}
                />

                {/*Confirm Password*/}
                <FormField
                    name="confirmPassword"
                    label="Confirm Password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            type="password"
                            className="py-1.5 h-fit"
                        />
                    )}
                />

                {/* If something went wrong in the server */}
                {error && (
                    <p className="text-red-600 font-medium">{error.message}</p>
                )}

                <Button size="lg" disabled={isPending} type="submit" className="w-full text-base">
                    {isPending ? <Spinner className="size-5" /> : "Register"}
                </Button>
            </FieldGroup>
        </form>
    );
}