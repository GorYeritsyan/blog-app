import { ReactNode } from "react";
import Header from "@/components/shared/Header";
import Container from "@/components/shared/Container";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main className="py-8">
                <Container>
                    {children}
                </Container>
            </main>
        </>
    );
}