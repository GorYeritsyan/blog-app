"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Button, { TButtonVariants } from "@/app/components/ui/Button";
import { useModal } from "@/app/components/ui/modal/Modal";

type ModalSubmitProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: TButtonVariants;
    className?: string;
    action: () => void;
}

export default function ModalSubmit({ children, variant, action, className, ...props }: ModalSubmitProps) {
    const { closeModal } = useModal();

    function handleModalSubmit() {
        action();
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