import Container from "@/app/components/shared/Container";
import BlogForm from "@/app/components/shared/BlogForm";
import BackButton from "@/app/components/shared/BackButton";

export default async function Page({ params }: { params: Promise<{ action: "create" | "edit" }> }) {
    const { action } = await params;

    return (
        <section>
            <Container>
                <div className="py-8 ">
                    <div className="flex items-start gap-8">
                        <BackButton />

                        <div className="flex flex-col gap-8">
                            <h1 className="text-4xl font-semibold capitalize">{action} blog post</h1>
                            <BlogForm />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}