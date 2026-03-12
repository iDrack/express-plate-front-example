export interface LoginResponse {
    accessToken: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string;
}
