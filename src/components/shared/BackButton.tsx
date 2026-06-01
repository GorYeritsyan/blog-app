"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/shadcn/button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button onClick={router.back} variant="ghost">
            <ArrowLeft />
            Back
        </Button>
    );
}