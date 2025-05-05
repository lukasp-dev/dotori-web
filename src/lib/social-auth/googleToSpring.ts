import api from "../api";
import { setAccessToken } from "../auth/tokenStorage";
import { setUserInfo } from "../auth/tokenStorage";

export const googleToSpring = async (email: string, name: string) => {
    const res = await api.post("/api/auth/social-login", {email, name});
    const accessToken = res.data;
    setAccessToken(accessToken);
    setUserInfo({ email, name });
};