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

// User Type
export type TUser = {
    id: number;
    name: string;
    email: string;
}

type TFailure = {
    success: false;
    error: string;
};

type TSuccess<T> = {
    success: true;
    pagination?: TPagination;
    data: T;
    message?: string;
    token?: string;
}

// API Response type
export type ApiResponse<T = never> = TSuccess<T> | TFailure;

export type LoginResponse = { success: true; message: string; token: string } | TFailure;