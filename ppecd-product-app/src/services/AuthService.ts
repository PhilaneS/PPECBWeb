import api from "../api/axio";
import type { loginRequest } from "../models/auth";
import type { ApiResponse } from "../models/response";

export const login = async (credentials: loginRequest) => {
    try {
        const response = await api.post<ApiResponse<string>>('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, data: '', error: 'Login failed' };
    }
};