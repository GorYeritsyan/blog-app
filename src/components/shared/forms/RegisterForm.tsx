"use client";

import { useActionState, useState } from "react";

import Field from "@/src/components/ui/form/Field";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import Form from "@/src/components/ui/form/Form";
import {createBlogPost} from "@/src/actions/actions";
import {registerUser} from "@/src/actions/auth";
import {useForm} from "react-hook-form";
import {RegisterBody, RegisterSchema} from "@/src/lib/validations/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

export default function RegisterForm() {
    const form = useForm<RegisterBody>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit = async (values: RegisterBody) => {
        await registerUser(values);
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

            <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner className="text-2xl" /> : "Register"}
            </Button>
        </Form>
    );
}