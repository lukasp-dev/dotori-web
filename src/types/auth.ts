export type AuthTokens = {
    accessToken: string;
    refreshToken?: string;
}

export type SignupData = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
};

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
};
