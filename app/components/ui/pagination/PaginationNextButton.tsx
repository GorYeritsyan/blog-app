"use client";

import { FaAngleRight } from "react-icons/fa6";
import Button from "@/app/components/ui/Button";

type PaginationNextButtonProps = {
    onIncrementPage: () => void;
    currentPage: number;
    totalPages: number;
}

export default function PaginationNextButton({ onIncrementPage, currentPage, totalPages }: PaginationNextButtonProps) {
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