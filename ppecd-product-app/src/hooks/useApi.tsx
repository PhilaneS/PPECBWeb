import { useAuth } from "../context/AuthContext";
import api from "../api/axio";
export const useApi = () => {
    const { token } = useAuth();

    api.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return { api };
};