import axios from "axios";
import { setAccessToken } from "./tokenStorage";
import type { AuthTokens, AuthUser, SignupData } from "@/types/auth";

export const signup = async (
    data: SignupData
): Promise<{ accessToken: string; user: AuthUser }> => {
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
        data,
        { withCredentials: true }
        );
    
    const { accessToken, user } = res.data;
    return { accessToken, user };
};
