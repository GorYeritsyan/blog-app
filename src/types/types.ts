export type TBlogPost = {
    id: string;
    title: string;
    content: string;
    author?: TUser;
    authorId: number;
    createdAt: Date;
    tags?: Tag[];
}

export type Tag = {
    id: number;
    title: string;
    posts?: TBlogPost[];
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
    posts?: TBlogPost[];
    createdAt: Date;
    sentFriendRequests?: TFriendRequest[];
    receivedFriendRequests?: TFriendRequest[];
}

export type TFriendRequest = {
    id: number;
    status: TFriendRequestStatus;
    createdAt: Date;
    updatedAt: Date;
    senderId: number;
    sender?: TUser;
    receiverId: number;
    receiver?: TUser;
}

export type TFriendRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

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