"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Field from "@/components/ui/form/Field";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/form/Form";
import { registerUser } from "@/actions/auth";
import { type RegisterFormValues, RegisterSchema } from "@/lib/validations/auth";

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
        <Form onSubmit={form.handleSubmit(onSubmit)} errors={form.formState.errors} className="max-w-100 space-y-4">
            {/* Name */}
            <Field name="name" label="Full Name">
                <Input {...form.register("name")} />
            </Field>

            {/* Email */}
            <Field name="email" label="Email">
                <Input {...form.register("email")} />
            </Field>

            {/* Password */}
            <Field name="password" label="Password">
                <Input {...form.register("password")} type="password" />
            </Field>

            {/* Confirm Password */}
            <Field name="confirmPassword" label="Confirm Password">
                <Input {...form.register("confirmPassword")} type="password" />
            </Field>

            {/* If something went wrong in the server */}
            {error && (
                <p className="text-red-600 font-medium">{error.message}</p>
            )}

            <Button disabled={isPending} loading={isPending} type="submit" className="w-full">
                Register
            </Button>
        </Form>
    );
}