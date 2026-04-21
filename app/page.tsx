import Post from "@/app/components/Post";
import Button from "@/app/components/ui/Button";

export default async function Home() {
    const posts = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api/posts`)
        .then(res => res.json());

    console.log(posts);

    return (
        <section>
            <div className="max-w-7xl m-auto">
                <div className="py-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-4xl font-bold">Blog Posts</h1>
                            <Button>Create Post</Button>
                        </div>
                        <div className="flex flex-col">
                            {posts.map(post => (
                                <Post key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}