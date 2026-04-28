"use client";

import { FaAngleLeft } from "react-icons/fa6";
import Button from "@/app/components/ui/Button";

type PrevButtonProps = {
    onDecrementPage: () => void;
}

export default function PrevButton({ onDecrementPage }: PrevButtonProps) {
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