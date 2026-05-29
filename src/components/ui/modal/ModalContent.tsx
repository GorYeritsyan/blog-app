"use client";

import { ReactNode, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useModal } from "@/components/ui/modal/Modal";

type ModalContentProps = {
    children: ReactNode;
    title: string;
    description: string;
}

export default function ModalContent({ children, title, description }: ModalContentProps) {
    const { isModalOpen, closeModal } = useModal();

    function handleModalClose(e: MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).id === "modal") {
            closeModal();
        }
    }

    if (!isModalOpen) return;

    return (
        createPortal((
            <div id="modal" onClick={handleModalClose} className="fixed size-full top-0 bg-zinc-900/60  backdrop-blur-xs flex items-center justify-center">
                <div className="bg-white rounded-lg border border-zinc-200 shadow-xs shadow-zinc-200 px-4 py-3 flex flex-col gap-5 min-w-95">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold">{title}</h2>
                        <p className="text-medium">{description}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end">
                        {children}
                    </div>
                </div>
            </div>
        ), document.body)
    )
}