"use client";

import Form from "@/src/components/ui/form/Form";
import Field from "@/src/components/ui/form/Field";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import {useActionState, useState} from "react";
import {createBlogPost} from "@/src/actions/actions";

export default function LoginForm() {
    const blogAction = "Login";
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

    // Show default values when editing blog post
    const defaultValues = {
        title: "",
        content: "",
        author: "",
    }

    const blogActionTrigger = (_: unknown, formData: FormData) => {
        const newErrors: { [key: string]: string } = {};
        const formValues = Object.fromEntries(formData) as { [key: string]: string };

        // Error message for required fields
        Object.entries(formValues).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = "This field is required";
            }
        });

        // Show error messages
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Reset errors to don't show messages
        setErrors(null);

        return createBlogPost(formData);
    };

    const [error, formAction, isPending] = useActionState(blogActionTrigger, undefined);

    return (
        <Form errors={errors} action={formAction} defaultValues={defaultValues} className="max-w-100 space-y-4">
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
                {isPending ? <Spinner className="text-2xl" /> : blogAction}
            </Button>
        </Form>
    );
}