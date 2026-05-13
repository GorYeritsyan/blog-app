import BlogForm from "@/app/components/shared/BlogForm";

type TPageProps = {
    params: Promise<{
        action: "edit" | "create";
        postId: string;
    }>
}

export default async function Page({ params }: TPageProps) {
    const { action, postId } = await params;

    console.log("Post ID", postId);
    console.log("Action", action);

    return (
        <>
            <BlogForm />
        </>
    );
}