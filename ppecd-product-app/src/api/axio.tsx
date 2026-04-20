import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7260/api",// process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;