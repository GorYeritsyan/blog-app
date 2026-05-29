"use client";

import {startTransition, useActionState, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "@/components/ui/form/Form";
import { type TBlogPost } from "@/types/types";
import { saveOrCreateBlogPost } from "@/actions/actions";
import { type BlogPostFormValues, BlogPostSchema } from "@/lib/validations/blog";
import {
    Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList, ComboboxValue
} from "@/components/shadcn/combobox";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/shadcn/field";
import {Input} from "@/components/shadcn/input";
import {Textarea} from "@/components/shadcn/textarea";
import {Button} from "@/components/shadcn/button";
import Spinner from "@/components/ui/Spinner";

const tags = ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Node.js", "REST API", "GraphQL", "Docker", "CI/CD", "Git", "PostgreSQL", "Redis", "Python", "Security", "Testing", "Performance", "Accessibility", "WebSockets", "Documentation"];

export default function BlogForm({ blogPost }: { blogPost?: TBlogPost }) {
    const [value, setValue] = useState([]);

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

    const onSubmit = (values: BlogPostFormValues) => {
        startTransition(() => {
            blogFormAction({ ...values, postId: blogPost?.id });
        });

        console.log("Form Values", values);
    };

    // return (
    //     <Form onSubmit={form.handleSubmit(onSubmit)} errors={form.formState.errors} className="max-w-100 space-y-4">
    //         <Field name="title" label="Title">
    //             <Input {...form.register("title")} />
    //         </Field>
    //
    //         <Field name="content" label="Content">
    //             <Textarea {...form.register("content")} />
    //         </Field>
    //
    //         {/* Combobox Start */}
    //         <Combobox
    //             items={frameworks}
    //             multiple
    //             value={value}
    //             onValueChange={setValue}
    //         >
    //             <ComboboxChips>
    //                 <ComboboxValue>
    //                     {value.map(item => (
    //                         <ComboboxChip key={item}>{item}</ComboboxChip>
    //                     ))}
    //                 </ComboboxValue>
    //                 <ComboboxChipsInput placeholder="Add framework" />
    //             </ComboboxChips>
    //
    //             <ComboboxContent align="center">
    //                 <ComboboxEmpty>No items found.</ComboboxEmpty>
    //                 <ComboboxList>
    //                     {(item) => (
    //                         <ComboboxItem key={item} value={item}>
    //                             {item}
    //                         </ComboboxItem>
    //                     )}
    //                 </ComboboxList>
    //             </ComboboxContent>
    //     </Combobox>
    //         {/* Combobox End */}
    //
    //         {/* If something went wrong in the server */}
    //         {error && (
    //             <p className="text-red-600 font-medium">{error.message}</p>
    //         )}
    //
    //         <Button disabled={isPending} loading={isPending} type="submit" className="w-full">
    //             {blogAction}
    //         </Button>
    //     </Form>
    // );

    return (
        <form className="max-w-100" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                            {/*<FieldLabel>Title</FieldLabel>*/}
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                            {/*<FieldLabel>Title</FieldLabel>*/}
                            <Textarea
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="tags"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                            <Combobox
                                {...field}
                                id={field.name}
                                items={tags}
                                multiple
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <ComboboxChips>
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

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Field>
                    <Button disabled={isPending}>
                        {isPending ? <Spinner className="text-2xl" /> : blogAction}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}