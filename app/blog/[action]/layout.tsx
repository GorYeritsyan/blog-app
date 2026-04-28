import Container from "@/app/components/shared/Container";
import BackButton from "@/app/components/shared/BackButton";
import { ReactNode } from "react";
import { TBlogAction } from "@/app/types/types";

type TPageProps = {
    children: ReactNode;
    params: Promise<{
        action: TBlogAction;
    }>
}

export async function generateMetadata({ params }: Pick<TPageProps, "params">) {
    const { action } = await params;

    // (Edit | Create) + Blog Post
    const title = `${action[0].toUpperCase() + action.slice(1)} Blog Post`;

    return { title };
}

export default async function Page({ children, params }: TPageProps) {
    const { action } = await params;

    return (
        <section>
            <Container>
                <div className="py-8 ">
                    <div className="flex items-start gap-8">
                        <BackButton />

                        <div className="flex flex-col gap-8 w-full">
                            <h1 className="text-4xl font-semibold capitalize">{action} blog post</h1>
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}