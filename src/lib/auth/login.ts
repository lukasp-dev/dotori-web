import axios from "axios";
import { AuthUser } from "@/types/auth";

export const loginWithCredentials = async (
  email: string,
  password: string
): Promise<{ accessToken: string; user: AuthUser }> => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );

  const { accessToken, user } = res.data;
  window.location.reload();
  return { accessToken, user };
};
