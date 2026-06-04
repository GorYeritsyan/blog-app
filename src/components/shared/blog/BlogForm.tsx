"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type TBlogPost } from "@/types/types";
import { saveOrCreateBlogPost } from "@/actions/actions";
import { type BlogPostFormValues, BlogPostSchema } from "@/lib/validations/blog";
import { FieldGroup } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Button } from "@/components/shadcn/button";
import Spinner from "@/components/ui/Spinner";
import FormField from "@/components/shared/forms/FormField";
import CreatableCombobox from "@/components/shared/CreatableCombobox";

const tags = ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Node.js", "REST API", "GraphQL", "Docker", "CI/CD", "Git", "PostgreSQL", "Redis", "Python", "Security", "Testing", "Performance", "Accessibility", "WebSockets", "Documentation"];

export default function BlogForm({ blogPost }: { blogPost?: TBlogPost }) {
    const isEditing = !!blogPost;
    const blogAction = isEditing ? "Save" : "Create";

    const form = useForm<BlogPostFormValues>({
        resolver: zodResolver(BlogPostSchema),
        defaultValues: {
            title: blogPost?.title || "",
            content: blogPost?.content || "",
            tags: blogPost?.tags?.map(tag => tag.title) || []
        },
    });

    const [error, blogFormAction, isPending] = useActionState(saveOrCreateBlogPost, undefined);

    // Add new combobox chip
    function handleAddTag(value: string) {
        form.setValue("tags", [...(form.getValues("tags") ?? []), value]);
    }

    // Handle form submit
    const onSubmit = (values: BlogPostFormValues) => {
        startTransition(() => {
            blogFormAction({ ...values, postId: blogPost?.id });
        });

        console.log("Form Values", values);
    };

    return (
        <form className="max-w-100" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
                {/*Title Field*/}
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5 h-fit"
                        />
                    )}
                />

                {/*Content Field*/}
                <FormField
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5"
                        />
                    )}
                />

                {/* TODO: Implement logic to create new tags */}
                <FormField
                    name="tags"
                    label="Tags (Optional)"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <CreatableCombobox field={field} fieldState={fieldState} onCreate={handleAddTag} items={tags} />
                    )}
                />

                <Button size="lg" disabled={isPending} className="cursor-pointer hover:bg-zinc-800">
                    {isPending ? <Spinner className="text-2xl size-fit" /> : blogAction}
                </Button>
            </FieldGroup>
        </form>
    );
}