export type TBlogPost = {
    id: string;
    title: string;
    content: string;
    author: string;
    slug: string;
    createdAt: Date;
}

export type TBlogAction = "create" | "edit";