"use client";

import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser } from "@/actions/auth";
import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {FieldGroup} from "@/components/shadcn/field";
import {Button} from "@/components/shadcn/button";
import {Spinner} from "@/components/shadcn/spinner";
import { type LoginFormValues, LoginSchema } from "@/lib/validations/auth";

const formFields: { name: "email" | "password"; type?: string }[] = [
    {
        name: "email",
    },
    {
        name: "password",
        type: "password",
    }
]

export default function LoginForm() {
    const [error, loginAction, isPending] = useActionState(loginUser, undefined);
    console.log("error", error);
    const errors = error?.details;

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error]);

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (values: LoginFormValues) => {
        console.log("errors", form.formState.errors);
        startTransition(() => {
            loginAction(values);
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-100">
            <FieldGroup className="gap-4">
                {/* Email and Password form fields */}
                {formFields.map(formField => (
                    <FormField
                        key={formField.name}
                        name={formField.name}
                        control={form.control}
                        errors={errors}
                        render={({ field, isInvalid }) => (
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

                {/*/!* If something went wrong in the server *!/*/}
                {/*{error && (*/}
                {/*    <p className="text-red-600 font-medium">{error.message}</p>*/}
                {/*)}*/}

                <Button disabled={isPending} size="lg" type="submit" className="w-full text-base">
                    {isPending ? <Spinner className="size-5" /> : "Login"}
                </Button>
            </FieldGroup>
        </form>
    );
}