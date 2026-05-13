"use client";

import Form from "@/src/components/ui/form/Form";
import Field from "@/src/components/ui/form/Field";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import {useActionState, useState} from "react";
import {createBlogPost} from "@/src/actions/actions";
import {loginUser} from "@/src/actions/auth";

export default function LoginForm() {
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

    const [error, formAction, isPending] = useActionState(loginUser, undefined);

    return (
        <Form errors={errors} action={formAction} className="max-w-100 space-y-4">
            <Field name="email" label="Email">
                <Input />
            </Field>

            <Field name="password" label="Password">
                <Input type="password" />
            </Field>

            {/* If something went wrong in the server */}
            {error && (
                <p className="text-red-600 font-medium">{error.message}</p>
            )}

            <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner className="text-2xl" /> : "Login"}
            </Button>
        </Form>
    );
}