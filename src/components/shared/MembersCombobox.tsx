"use client"

import {useMemo} from "react";
import {ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues} from "react-hook-form";

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/shadcn/combobox";
import {TUser} from "@/types/types";

type MembersComboboxProps<T extends FieldValues> = {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: ControllerFieldState;
    members?: TUser[];
}

export default function MembersCombobox<T extends FieldValues>({ field, fieldState, members }: MembersComboboxProps<T>) {
    const items = typeof members !== "undefined" && members.length > 0 ? members.map(member => ({ value: member.id, label: member.name })) : [];

    const labelsMap = useMemo(() => Object.fromEntries(items.map(item => [item.value, item.label])), [members]);

    return (
        <Combobox
            {...field}
            id={field.name}
            items={items}
            multiple
            value={field.value}
            onValueChange={field.onChange}
        >
            <ComboboxChips className="py-1.5 h-fit">
                <ComboboxValue>
                    {field.value.map((id: number) => (
                        <ComboboxChip key={id}>{labelsMap[id]}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput aria-invalid={fieldState.invalid} />
            </ComboboxChips>
            <ComboboxContent align="center">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.value} value={item.value} className="pointer-events-auto">
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
