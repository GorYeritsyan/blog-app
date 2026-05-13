"use client";

import { useActionState, useState } from "react";

import Field from "@/src/components/ui/form/Field";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import Form from "@/src/components/ui/form/Form";
import {createBlogPost} from "@/src/actions/actions";
import {registerUser} from "@/src/actions/auth";

export default function RegisterForm() {
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

    const [error, formAction, isPending] = useActionState(registerUser, undefined);

    return (
        <Form errors={errors} action={formAction} className="max-w-100 space-y-4">
            {/* Name */}
            <Field name="name" label="Full Name">
                <Input />
            </Field>

            {/* Email */}
            <Field name="email" label="Email">
                <Input />
            </Field>

            {/* Password */}
            <Field name="password" label="Password">
                <Input type="password" />
            </Field>

            {/* Confirm Password */}
            <Field name="confirmPassword" label="Confirm Password">
                <Input type="password" />
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