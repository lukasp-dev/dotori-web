import { useEffect, useState } from "react";
import { getAccessToken, getUserInfo } from "@/lib/auth/tokenStorage";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

    useEffect(() => {
        const token = getAccessToken();
        const info = getUserInfo();
        setIsLoggedIn(!!token);
        setUser(info);
    }, []);

    return { isLoggedIn, user };
};
