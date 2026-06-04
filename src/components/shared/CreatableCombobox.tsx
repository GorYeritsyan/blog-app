"use client";

import { useState, KeyboardEvent } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
    ComboboxValue
} from "@/components/shadcn/combobox";

type CreatableComboboxProps<T extends FieldValues> = {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: ControllerFieldState;
    onCreate: (value: string) => void;
    items: string[];
}

export default function CreatableCombobox<T extends FieldValues>({ field, fieldState, onCreate, items }: CreatableComboboxProps<T>) {
    const [inputValue, setInputValue] = useState("");

    // Create combobox chip when triggering Enter or Comma
    function createComboboxChip(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            const fieldValueExists = field.value.includes(inputValue.trim());

            if (!inputValue.trim() || fieldValueExists) {
                return;
            }

            onCreate(inputValue);
            setInputValue("");
        }
    }

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
                    {field.value.map((item: string) => (
                        <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={createComboboxChip}
                    aria-invalid={fieldState.invalid}
                />
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
    );
}