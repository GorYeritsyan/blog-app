import Container from "@/app/components/shared/Container";

export default async function Page({ params }: { params: Promise<{ action: "create" | "edit" }> }) {
    const { action } = await params;

    return (
        <section>
            <Container>
                <div className="py-8">
                    <h1 className="text-4xl font-semibold capitalize">{action} blog post</h1>
                </div>
            </Container>
        </section>
    );
}