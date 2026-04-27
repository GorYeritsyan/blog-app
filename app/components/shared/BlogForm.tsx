"use client";

import { useActionState, useState } from "react";

import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { createBlogPost, editBlogPost } from "@/app/actions/actions";
import { type TBlogPost } from "@/app/types/types";
import Spinner from "@/app/components/ui/Spinner";
import Form from "@/app/components/ui/form/Form";
import Field from "@/app/components/ui/form/Field";
import Textarea from "@/app/components/ui/Textarea";

export default function BlogForm({ blogPost }: { blogPost?: TBlogPost }) {
    const isEditing = !!blogPost;

    const blogAction = isEditing ? "Edit" : "Create";
    const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);

    // Show default values when editing blog post
    const defaultValues = {
        title: blogPost?.title ?? "",
        content: blogPost?.content ?? "",
        author: blogPost?.author ?? "",
    }

    const blogActionTrigger = (prevState: { message: string } | undefined, formData: FormData) => {
        const newErrors: { [key: string]: string } = {};
        const formValues = Object.fromEntries(formData) as { [key: string]: string };

        Object.entries(formValues).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = "This field is required";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors(null);

       return isEditing ? editBlogPost(prevState, formData, blogPost.id) : createBlogPost(prevState, formData);
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