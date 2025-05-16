import axios from "axios";
import { clearAuth } from "@/lib/auth/tokenStorage";

export const logout = async (): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      null,
      {
        withCredentials: true,
      }
    );

    clearAuth();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  } catch (error) {
    console.error("Logout failed:", error);
    clearAuth();
  }
};
