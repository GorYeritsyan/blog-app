"use client";

import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {FieldGroup} from "@/components/shadcn/field";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { type GroupChatFormValues, GroupChatSchema} from "@/lib/validations/chat";
import MembersCombobox from "@/components/shared/MembersCombobox";
import {TUser} from "@/types/types";
import {createGroupChat} from "@/actions/messages";
import {toast} from "sonner";

export default function GroupChatForm({ onClose, members }: { onClose: () => void; members: TUser[] }) {
    const form = useForm<GroupChatFormValues>({
        resolver: zodResolver(GroupChatSchema),
        defaultValues: {
            name: "",
            memberIds: [],
        },
    });

    const onSubmit = async (values: GroupChatFormValues) => {
        console.log("Values", values);
        try {
            await createGroupChat(values);

            toast.success("Group chat created successfully.");
        } catch (error) {
            toast.error(error.message);
        } finally {
            onClose();
        }
    }

    return (
        <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="memberIds"
                    label="Members"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <MembersCombobox field={field} fieldState={fieldState} members={members} />
                        // <Input
                        //     {...field}
                        //     id={field.name}
                        //     aria-invalid={fieldState.invalid}
                        //     className="py-1.5 h-fit"
                        // />
                    )}
                />
            </FieldGroup>
        </form>
    )
}