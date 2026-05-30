import {
    Control,
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    useController
} from "react-hook-form";
import {Field, FieldError, FieldLabel} from "@/components/shadcn/field";
import {Input} from "@/components/shadcn/input";
import {ReactNode} from "react";

type FormFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    label?: string;
    control: Control<T>;
    render: (props: {
        field:  ControllerRenderProps<T, FieldPath<T>>;
        fieldState: ControllerFieldState
    }) => ReactNode;
}

export default function FormField<T extends FieldValues>({ name, control, label, render }: FormFieldProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel className="capitalize" htmlFor={field.name}>{label ? label : name}</FieldLabel>
                    {render({ field, fieldState })}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}