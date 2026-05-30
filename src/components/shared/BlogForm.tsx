"use client";

import {startTransition, useActionState, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type TBlogPost } from "@/types/types";
import { saveOrCreateBlogPost } from "@/actions/actions";
import { type BlogPostFormValues, BlogPostSchema } from "@/lib/validations/blog";
import {
    Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList, ComboboxValue
} from "@/components/shadcn/combobox";
import { FieldGroup } from "@/components/shadcn/field";
import { Input} from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Button } from "@/components/shadcn/button";
import Spinner from "@/components/ui/Spinner";
import FormField from "@/components/shared/forms/FormField";

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

                <FormField
                    name="tags"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Combobox
                            {...field}
                            id={field.name}
                            items={tags}
                            multiple
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <ComboboxChips className="py-1.5 h-fit">
                                <ComboboxValue>
                                    {field.value.map(item => (
                                        <ComboboxChip key={item}>{item}</ComboboxChip>
                                    ))}
                                </ComboboxValue>
                                <ComboboxChipsInput aria-invalid={fieldState.invalid} />
                            </ComboboxChips>

                            <ComboboxContent align="center">
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    )}
                />

                <Button size="lg" disabled={isPending} className="cursor-pointer hover:bg-zinc-800">
                    {isPending ? <Spinner className="text-2xl size-fit" /> : blogAction}
                </Button>
            </FieldGroup>
        </form>
    );
}