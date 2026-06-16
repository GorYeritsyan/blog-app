"use client";

import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {Field, FieldGroup} from "@/components/shadcn/field";
import {useForm} from "react-hook-form";
import CreatableCombobox from "@/components/shared/CreatableCombobox";
import {zodResolver} from "@hookform/resolvers/zod";
import {GroupChatSchema} from "@/lib/validations/chat";
import Search from "@/components/shared/Search";
import MembersCombobox from "@/components/shared/MembersCombobox";

export default function GroupChatForm({ members }) {
    const form = useForm({
        resolver: zodResolver(GroupChatSchema),
        defaultValues: {
            name: "",
            members: [],
        },
    });

    return (
        <FieldGroup className="gap-4">
            <FormField
                name="name"
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
                name="members"
                control={form.control}
                render={({ field, fieldState }) => (
                    <MembersCombobox field={field} fieldState={fieldState} onCreate={() => {}} members={members} />
                    // <Input
                    //     {...field}
                    //     id={field.name}
                    //     aria-invalid={fieldState.invalid}
                    //     className="py-1.5 h-fit"
                    // />
                )}
            />

        </FieldGroup>
    )
}