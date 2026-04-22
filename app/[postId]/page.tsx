import Container from "@/app/components/shared/Container";
import BackButton from "@/app/components/shared/BackButton";

export default async function Page({ params }: { params: Promise<{ postId: string }>}) {
    const { postId } = await params;

    const res = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts/${postId}`);
    const blogPost = await res.json();

    const date = new Date(blogPost.createdAt).toDateString();

    console.log(blogPost);

    return (
        <section>
            <Container>
                <div className="py-8">
                    <div className="flex items-start gap-10">
                        <BackButton />
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3 items-center text-center w-full">
                                <h1 className="capitalize self-center text-4xl font-semibold">{blogPost.title}</h1>

                                <span className="text-zinc-400">{date}</span>

                                <p className="text-gray-400">
                                    Created by <span className="font-medium text-zinc-900">{blogPost.author}</span>
                                </p>
                            </div>

                            <p className="leading-tight text-lg text-center">{blogPost.content}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}