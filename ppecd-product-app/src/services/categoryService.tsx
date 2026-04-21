import { useApi } from "../hooks/useApi";
import type { Category } from "../models/Category";
import type { ApiResponse } from "../models/response";

export const useCategoryService = () => {
  const { api } = useApi();

const getCategories = async () => {
  const response = await api.get<ApiResponse<Category[]>>("/Category/list");
  return response.data.data;
};

const addCategory = async (category: Category) => {
  const response = await api.post<ApiResponse<void>>("/Category/add", category);
  return response.data;
};

const editCategory = async (id: number, category: Category) => {
  const response = await api.put<ApiResponse<void>>(`/Category/${id}`, category);
  return response.data;
};

return { getCategories, addCategory, editCategory };
}