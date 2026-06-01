"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn/button";

type NextButtonProps = {
    onIncrementPage: () => void;
    currentPage: number;
    totalPages: number;
}

export default function NextButton({ onIncrementPage, currentPage, totalPages }: NextButtonProps) {
    return (
        <Button
            variant="ghost"
            size="lg"
            className="text-base px-3"
            disabled={currentPage === totalPages}
            onClick={onIncrementPage}
        >
            Next
            <ChevronRight className="size-5" />
        </Button>
    )
}