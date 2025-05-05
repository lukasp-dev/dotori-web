import axios from "axios";
import { clearAuth } from "@/lib/auth/tokenStorage";

export const logout = async (): Promise<void> => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, null, {
    withCredentials: true,
});

    clearAuth();
};
