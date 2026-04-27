"use client";

import Button from "@/app/components/ui/Button";

type PaginationButtonProps = {
    page: number;
    currentPage: number;
    onChangePage: (page: number) => void;
}

export default function PaginationButton({ page, currentPage, onChangePage }: PaginationButtonProps) {
    return (
        <Button
            onClick={() => onChangePage(page)}
            variant={currentPage === page ? "primary" : "ghost"}
        >
            {page}
        </Button>
    );
}