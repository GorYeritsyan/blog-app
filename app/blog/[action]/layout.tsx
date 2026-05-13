import { ReactNode } from "react";
import Container from "@/app/components/shared/Container";
import BackButton from "@/app/components/shared/BackButton";

type TLayoutProps = {
    children: ReactNode;
    params: Promise<{ action: "edit" | "create" }>;
}

export default async function Layout({ children, params }: TLayoutProps ) {
    const { action } = await params;

    return (
        <section>
            <Container>
                <div className="py-8 ">
                    <div className="flex items-start gap-8">
                        <BackButton />

                        <div className="flex flex-col gap-8">
                            <h1 className="text-4xl font-semibold capitalize">{action} blog post</h1>
                            {/*<BlogForm />*/}
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}