"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/shadcn/button";

type PrevButtonProps = {
    onDecrementPage: () => void;
}

export default function PrevButton({ onDecrementPage }: PrevButtonProps) {
    return (
        <Button
            size="lg"
            className="text-base px-3"
            variant="ghost"
            onClick={onDecrementPage}
        >
            <ChevronLeft className="size-5" />
            Prev
        </Button>
    );
}