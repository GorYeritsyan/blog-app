import BlogForm from "@/app/components/shared/BlogForm";

type TPageProps = {
    params: Promise<{
        action: "edit" | "create";
        postId: string;
    }>
}

export default async function Page({ params }: TPageProps) {
    const { postId } = await params;

    return (
        <>
            <BlogForm />
        </>
    );
}