import BlogForm from "@/app/components/shared/BlogForm";
import {TBlogAction} from "@/app/types/types";

export default async function Page({ params }: { params: Promise<{ action: TBlogAction }> }) {
    return (
        <>
            <BlogForm />
        </>
    );
}