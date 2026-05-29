import { ReactNode } from "react";
import Container from "@/components/shared/Container";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <section>
            <Container>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="border border-zinc-200 rounded-lg px-6 py-5 min-w-100 w-fit flex flex-col gap-6">
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}