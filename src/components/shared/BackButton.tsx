"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

import Button from "@/components/ui/Button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button onClick={router.back} variant="ghost">
            <FaArrowLeftLong />
            Back
        </Button>
    );
}