"use client";


import { Button } from "@/components/shadcn/button";

type PaginationButtonProps = {
    page: number;
    currentPage: number;
    onChangePage: (page: number) => void;
}

export default function PaginationButton({ page, currentPage, onChangePage }: PaginationButtonProps) {
    return (
        <Button
            size="icon-lg"
            onClick={() => onChangePage(page)}
            variant={currentPage === page ? "default" : "ghost"}
        >
            {page}
        </Button>
    );
}