import { useEffect, useState } from "react";
import { getAccessToken, getUserInfo } from "@/lib/auth/tokenStorage";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      const info = getUserInfo();
      setIsLoggedIn(!!token);
      setUser(info);
    };

    // 초기 체크
    checkAuth();

    // storage 이벤트 리스너 추가
    window.addEventListener("storage", checkAuth);

    // 커스텀 이벤트 리스너 추가
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  return { isLoggedIn, user };
};
