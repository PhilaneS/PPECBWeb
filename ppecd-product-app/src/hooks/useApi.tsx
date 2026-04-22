import { useAuth } from "../context/AuthContext";
import api from "../api/axio";
import { useEffect } from "react";
export const useApi = () => {
    const { token } = useAuth();

useEffect(() => {

    const requestInterceptor = api.interceptors.request.use(
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

    const responseInterceptor = api.interceptors.response.use(
        (response) => response,
       async (error) => {
                // if (error.response && error.response.status === 401) {

                //     try {
                //      const refreshResponse = await api.post('/auth/refresh');
                //      const newToken = refreshResponse.data.data;

                //      localStorage.setItem("authToken", newToken);
                     
                //      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                     
                //      error.config.headers['Authorization'] = `Bearer ${newToken}`;
                //      return api.request(error.config);   
                //     } catch (refreshError) {
                //         //logout(); // If refresh fails, log out the user

                //         return Promise.reject(refreshError);
                //     }
                // }
            return Promise.reject(error);
        }
    );


    return () => {
        api.interceptors.request.eject(requestInterceptor);
        api.interceptors.response.eject(responseInterceptor);

    };
}, [token]);

    return { api };
};