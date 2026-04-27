"use client";

import { FaAngleLeft } from "react-icons/fa6";
import Button from "@/app/components/ui/Button";

type PaginationPrevButtonProps = {
    onDecrementPage: () => void;
}

export default function PaginationPrevButton({ onDecrementPage }: PaginationPrevButtonProps) {
    return (
        <Button
            variant="ghost"
            onClick={onDecrementPage}
        >
            <FaAngleLeft />
            Prev
        </Button>
    );
}