"use client";

import {toast} from "sonner";
import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {FieldGroup} from "@/components/shadcn/field";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductFormValues, ProductSchema} from "@/lib/validations/products";
import {createProduct} from "@/actions/products";

export default function ProductForm({ onClose }: { onClose: () => void }) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            price: 0,
        },
    });

    const onSubmit = async (values: ProductFormValues) => {
        console.log("Values", values);
        try {
            await createProduct(values);
            toast.success("Your product successfully created!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            onClose();
        }
    }

    return (
        <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5 h-fit"
                            type="number"
                        />
                    )}
                />
            </FieldGroup>
        </form>
    )
}