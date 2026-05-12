export type TBlogPost = {
    id: string;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
}

// Pagination type
export type TPagination = {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type TBlogAction = "create" | "edit";