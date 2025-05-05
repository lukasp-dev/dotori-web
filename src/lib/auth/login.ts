import axios from "axios";
import { AuthTokens, AuthUser } from "@/types/auth";

export const loginWithCredentials = async (
    email: string,
    password: string
): Promise<{ accessToken: string; user: AuthUser }> => {
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        null,
        {
            params: { email, password },
            withCredentials: true,
        }
    );

    const { accessToken, user } = res.data;
    return { accessToken, user };
};
