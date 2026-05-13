import { ReactNode } from "react";
import Header from "@/src/components/shared/Header";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}