"use client";

import {toast} from "sonner";
import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {FieldGroup} from "@/components/shadcn/field";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductFormValues, ProductSchema} from "@/lib/validations/products";
import {createProduct, editProduct} from "@/actions/products";
import {TProduct} from "@/types/types";

export default function ProductForm({ product, onClose }: { product?: TProduct; onClose: () => void }) {
    const isEditing = !!product;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: product?.title ?? "",
            price: product?.price ?? 0,
        },
    });

    const onSubmit = async ({ title, price }: ProductFormValues) => {
        try {
            if (isEditing) {
                await editProduct({ title, price, productId: product.id });
            } else {
                await createProduct({ title, price });
            }

            toast.success(`Your product successfully ${isEditing ? "updated" : "created" }!`);
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