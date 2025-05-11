import api from "../api";
import { setAccessToken, setUserInfo } from "../auth/tokenStorage";
import type { AuthUser } from "@/types/auth";

export const googleToSpring = async (email: string, name: string) => {
  const res = await api.post("/api/auth/social-login", { email, name });
  
  const { accessToken, user } = res.data as { accessToken: string; user: AuthUser };

  setAccessToken(accessToken);
  setUserInfo(user);
};
