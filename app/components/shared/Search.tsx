"use client";

import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Input from "@/app/components/ui/Input";

export default function Search() {
    const [query, setQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);

        if (e.target.value.trim()) {
            const params = new URLSearchParams();
            params.set("query", e.target.value);
            // window.history.replaceState(null, "", `?${params.toString()}`);
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            // window.history.replaceState(null, "", "?");
            router.replace(`${pathname}`);
        }

    }

    return (
        <Input value={query} onChange={handleSearch} />
    );
}