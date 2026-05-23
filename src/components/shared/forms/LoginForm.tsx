"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "@/src/components/ui/form/Form";
import Field from "@/src/components/ui/form/Field";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { loginUser } from "@/src/actions/auth";
import { type LoginFormValues, LoginSchema } from "@/src/lib/validations/auth";

export default function LoginForm() {
    const [error, loginAction, isPending] = useActionState(loginUser, undefined);

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (values: LoginFormValues) => {
        startTransition(() => {
            loginAction(values);
        })
    };

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)} errors={form.formState.errors} className="max-w-100 space-y-4">
            <Field name="email" label="Email">
                <Input {...form.register("email")} />
            </Field>

            <Field name="password" label="Password">
                <Input {...form.register("password")} type="password" />
            </Field>

            {/* If something went wrong in the server */}
            {error && (
                <p className="text-red-600 font-medium">{error.message}</p>
            )}

            <Button disabled={isPending} loading={isPending} type="submit" className="w-full">
                Login
            </Button>
        </Form>
    );
}