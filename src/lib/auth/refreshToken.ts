import axios from "axios";
import { setAccessToken } from "./tokenStorage";
import type { AuthTokens } from "@/types/auth";

export const refreshAccessToken = async (): Promise<AuthTokens> => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`,
        null,
        { withCredentials: true } 
    );

    const accessToken = res.data;
    setAccessToken(accessToken);

    return { accessToken };
};
