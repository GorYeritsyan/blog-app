"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import Button, { TButtonVariants } from "@/app/components/ui/Button";
import {useModal} from "@/app/components/ui/modal/Modal";

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