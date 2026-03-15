export interface MessageResponse {
    status: string;
    message: string;
}

export interface LoginResponse {
    status: string;
    data: {
        accessToken: string;
    };
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface UserProfileResponse {
    status: "string";
    data: UserProfile;
}
