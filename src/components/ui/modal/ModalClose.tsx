"use client";

import Button, { TButtonVariants } from "@/src/components/ui/Button";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useModal } from "@/src/components/ui/modal/Modal";

type ModalCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: TButtonVariants;
    className?: string;
}

export default function ModalClose({ children, variant, className, ...props }: ModalCloseProps) {
    const { closeModal } = useModal();

    return (
        <Button
            className={className}
            variant={variant}
            onClick={closeModal}
            {...props}
        >
            {children}
        </Button>
    )
}