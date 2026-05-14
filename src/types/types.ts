export type TBlogPost = {
    id: string;
    title: string;
    content: string;
    author?: TUser;
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

type ApiFailure = {
    success: false;
    error: string;
};

export type ApiSuccess<T> = {
    success: true;
    pagination?: TPagination;
    data: T;
    message?: string;
    token?: string;
}

// API Response type
export type ApiResponse<T = never> = ApiSuccess<T> | ApiFailure;

export type LoginResponse = { success: true; message: string; token: string } | ApiFailure;