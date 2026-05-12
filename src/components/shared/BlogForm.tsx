"use client";

import { useActionState, useState } from "react";

import { type TBlogPost } from "@/src/types/types";
import { createBlogPost, saveBlogPost } from "@/src/actions/actions";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import Form from "@/src/components/ui/form/Form";
import Field from "@/src/components/ui/form/Field";
import Textarea from "@/src/components/ui/Textarea";

export default function BlogForm({ blogPost }: { blogPost?: TBlogPost }) {
    const isEditing = !!blogPost;

    const blogAction = isEditing ? "Save" : "Create";
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

    // Show default values when editing blog post
    const defaultValues = {
        title: blogPost?.title ?? "",
        content: blogPost?.content ?? "",
        author: blogPost?.author ?? "",
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

       return isEditing ? saveBlogPost(formData, blogPost.id) : createBlogPost(formData);
    };

    const [error, formAction, isPending] = useActionState(blogActionTrigger, undefined);

    return (
        <Form errors={errors} action={formAction} defaultValues={defaultValues} className="max-w-100 space-y-4">
            <Field name="title" label="Title">
                <Input />
            </Field>

            <Field name="content" label="Content">
                <Textarea />
            </Field>

            <Field name="author" label="Author">
                <Input />
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