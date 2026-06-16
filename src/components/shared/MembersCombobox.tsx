"use client"

import * as React from "react"

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
} from "@/components/shadcn/combobox"

const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
] as const

export default function MembersCombobox({ field, fieldState, onCreate, members }) {
    return (
        <Combobox
            {...field}
            id={field.name}
            items={members}
            multiple
            value={field.value}
            onValueChange={field.onChange}
        >
            <ComboboxChips className="w-full max-w-xs">
                <ComboboxValue>
                    {field.value.map((item: string) => (
                        <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput />
            </ComboboxChips>
            <ComboboxContent align="center">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.id} value={item.id}>
                            {item.name}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
