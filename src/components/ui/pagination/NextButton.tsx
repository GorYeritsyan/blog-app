"use client";

import { FaAngleRight } from "react-icons/fa6";
import Button from "@/components/ui/Button";

type NextButtonProps = {
    onIncrementPage: () => void;
    currentPage: number;
    totalPages: number;
}

export default function NextButton({ onIncrementPage, currentPage, totalPages }: NextButtonProps) {
    return (
        <Button
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={onIncrementPage}
        >
            Next
            <FaAngleRight />
        </Button>
    )
}