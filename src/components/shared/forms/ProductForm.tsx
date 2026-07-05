"use client";

import {useForm} from "react-hook-form";
import {toast} from "sonner";

import FormField from "@/components/shared/forms/FormField";
import {Input} from "@/components/shadcn/input";
import {FieldGroup} from "@/components/shadcn/field";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductFormValues, ProductSchema} from "@/lib/validations/products";
import {createProduct, editProduct} from "@/actions/products";
import {TProduct} from "@/types/types";

export default function ProductForm({ product, onClose }: { product?: TProduct; onClose: () => void }) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: product?.title ?? "",
            price: product?.price ?? 0,
            // image: undefined,
        },
    });

    const onSubmit = async ({ title, price, image }: ProductFormValues) => {
        const formData = new FormData();
        formData.set("title", title);
        formData.set("price", price.toString());

        if (image) {
            formData.set("image", image);
        }

        try {
            if (product) {
                await editProduct(product.id, formData);
            } else {
                // await createProduct({ title, price });
                await createProduct(formData);
            }

            toast.success(`Your product successfully ${product ? "updated" : "created" }!`);
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

                <FormField
                    name="image"
                    control={form.control}
                    render={({ field: { value, onChange, ...field }, fieldState }) => (
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="py-1.5 h-fit"
                            type="file"
                            accept="image/*"
                            onChange={e => onChange(e.target.files?.[0])}
                        />
                    )}
                />
            </FieldGroup>
        </form>
    )
}