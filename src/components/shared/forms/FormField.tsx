import { ReactNode } from "react";
import {
    Control,
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";

type FormFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    label?: string;
    control: Control<T>;
    render: (props: {
        field:  ControllerRenderProps<T, FieldPath<T>>;
        fieldState: ControllerFieldState;
        isInvalid?: boolean;
    }) => ReactNode;
    errors?: { [key: string]: string };
}

export default function FormField<T extends FieldValues>({ name, control, label, render, errors }: FormFieldProps<T>) {
    console.log("field error", errors?.[name])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid || Boolean(errors?.[name]);

                return (
                    <Field className="gap-1.5" data-invalid={isInvalid}>
                        <FieldLabel className="capitalize" htmlFor={field.name}>{label ? label : name}</FieldLabel>
                        {render({ field, fieldState, isInvalid })}
                        {isInvalid && (
                            <FieldError errors={[fieldState.error || { message: errors?.[name] }]} />
                        )}
                    </Field>
                )
            }}
        />
    );
}