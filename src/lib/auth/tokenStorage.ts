export const ACCESS_TOKEN_KEY = "accessToken";
export const USER_INFO_KEY = "userInfo";

export const getAccessToken = (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
};

export const getUserInfo = (): { name?: string; email?: string } | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_INFO_KEY);
    return raw ? JSON.parse(raw) : null;
};

export const setAccessToken = (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const setUserInfo = (info: { name?: string; email?: string }) => {
    if (typeof window !== "undefined") localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
};

export const clearAuth = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_INFO_KEY);
    }
};
