"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useModal } from "@/src/components/ui/modal/Modal";
import Button, { TButtonVariants } from "@/src/components/ui/Button";

type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: TButtonVariants;
    className?: string;
}

export default function ModalTrigger({ children, variant, className, ...props }: ModalTriggerProps) {
    const { triggerModal } = useModal();

    return (
        <Button
            className={className}
            variant={variant}
            onClick={triggerModal}
            {...props}
        >
            {children}
        </Button>
    )
}