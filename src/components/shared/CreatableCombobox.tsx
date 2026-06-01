import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList,
    ComboboxValue
} from "@/components/shadcn/combobox";
import {ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues} from "react-hook-form";

type CreatableComboboxProps<T extends FieldValues> = {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: ControllerFieldState;
    items: string[];
}

export default function CreatableCombobox<T extends FieldValues>({ field, fieldState, items }: CreatableComboboxProps<T>) {
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
    );
}