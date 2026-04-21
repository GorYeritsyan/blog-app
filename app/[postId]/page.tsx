import Button from "@/app/components/ui/Button";

export default async function Page({ params }: { params: Promise<{ postId: string }>}) {
    const { postId } = await params;

    return (
        <div>
            <h1>Post ID {postId}</h1>
            <Button>Create</Button>
        </div>
    );
}