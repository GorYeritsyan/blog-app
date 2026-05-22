"use client";

import { ChangeEvent, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Input from "@/src/components/ui/Input";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    const [query, setQuery] = useState(searchParams.get("query") ?? "");

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);

        // Search using debounce
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (e.target.value.trim()) {
                params.set("query", e.target.value);
            } else {
                params.delete("query");
            }

            // Reset page
            params.delete("page");

            router.replace(`${pathname}?${params.toString()}`);
        }, 1000);
    }

    return (
        <Input placeholder={placeholder} value={query} onChange={handleSearch} />
    );
}