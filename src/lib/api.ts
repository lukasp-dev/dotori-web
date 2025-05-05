import axios from "axios";
import { getAccessToken, setAccessToken, clearAuth } from "./auth/tokenStorage";
import { refreshAccessToken } from "./auth/refreshToken";
import { logout } from "./auth/logout";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status == 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;
            try {
                const { accessToken } = await refreshAccessToken();
                setAccessToken(accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (err) {
                clearAuth();
                await logout();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;