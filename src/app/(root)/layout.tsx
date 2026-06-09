import { ReactNode } from "react";
import Header from "@/components/shared/Header";
import Container from "@/components/shared/Container";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="py-8 flex-1">
                <Container className="h-full">
                    {children}
                </Container>
            </main>
        </div>
    );
}