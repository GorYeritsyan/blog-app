"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Spinner from "@/src/components/ui/Spinner";
import Form from "@/src/components/ui/form/Form";
import Field from "@/src/components/ui/form/Field";
import Textarea from "@/src/components/ui/Textarea";
import { type TBlogPost } from "@/src/types/types";
import { saveOrCreateBlogPost } from "@/src/actions/actions";
import { type BlogPostFormValues, BlogPostSchema } from "@/src/lib/validations/blog";

export default function BlogForm({ blogPost }: { blogPost?: TBlogPost }) {
    const isEditing = !!blogPost;
    const blogAction = isEditing ? "Save" : "Create";

    const form = useForm<BlogPostFormValues>({
        defaultValues: {
            title: blogPost?.title || "",
            content: blogPost?.content || "",
        },
        resolver: zodResolver(BlogPostSchema)
    });

    const [error, blogFormAction, isPending] = useActionState(saveOrCreateBlogPost, undefined);

    const onSubmit = (values: BlogPostFormValues) => {
        startTransition(() => {
            blogFormAction({ ...values, postId: blogPost?.id });
        });

        console.log(values);
    };

    return (
        <Form onSubmit={form.handleSubmit(onSubmit)} errors={form.formState.errors} className="max-w-100 space-y-4">
            <Field name="title" label="Title">
                <Input {...form.register("title")} />
            </Field>

            <Field name="content" label="Content">
                <Textarea {...form.register("content")} />
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