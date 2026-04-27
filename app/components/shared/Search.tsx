"use client";

import { ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Input from "@/app/components/ui/Input";

export default function Search() {
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("query") ?? "");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        const params = new URLSearchParams(searchParams);

        if (e.target.value.trim()) {
            params.set("query", e.target.value);
        } else {
            params.delete("query");
        }

        params.set("page", "1");

        // window.history.replaceState(null, "", `?${params.toString()}`);
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Input placeholder="Search for blog posts..." value={query} onChange={handleSearch} />
    );
}