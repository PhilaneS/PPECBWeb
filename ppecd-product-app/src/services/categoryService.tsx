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
  const response = await api.post<ApiResponse<Category>>("/Category/create", category);
  return response.data;
};

const editCategory = async (category: Category) => {
  console.log("before editting :",category);
  //const data ={ CategoryId: category.categoryId, CategoryCode: category.categoryCode, Name: category.categoryName, IsActive:category.isActive };
  const response = await api.put<ApiResponse<Category>>(`/Category/${category.categoryId}`, category);
  return response.data;
};

return { getCategories, addCategory, editCategory };
}