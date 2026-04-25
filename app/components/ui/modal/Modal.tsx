"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type TModalContext = {
    isModalOpen: boolean;
    triggerModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<TModalContext | null>(null);

type ModalProps = {
    children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const triggerModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            triggerModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) throw new Error('useModal must be used within Modal');

    return context;
}