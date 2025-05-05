import { setAccessToken } from "@/lib/auth/tokenStorage";
import type { AuthUser } from "@/types/auth";

export const persistAuth = (accessToken: string, user: AuthUser) => {
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
};
