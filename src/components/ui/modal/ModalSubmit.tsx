"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Button, { TButtonVariants } from "@/src/components/ui/Button";
import { useModal } from "@/src/components/ui/modal/Modal";

type ModalSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: TButtonVariants;
    className?: string;
    onSubmit: () => void;
}

export default function ModalSubmit({ children, variant, onSubmit, className, ...props }: ModalSubmitProps) {
    const { closeModal } = useModal();

    function handleModalSubmit() {
        onSubmit();
        closeModal();
    }

    return (
        <Button
            className={className}
            variant={variant}
            onClick={handleModalSubmit}
            {...props}
        >
            {children}
        </Button>
    );
}