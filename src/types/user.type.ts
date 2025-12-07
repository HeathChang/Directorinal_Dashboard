export interface iUserRequest {
    email: string;
    password: string;
}

export interface iUserResponse {
    token: string;
    user: {
        id: string;
        email: string;
    }
}