
import type { Product } from "../models/product";
import type { ApiResponse } from "../models/response";
import { useApi } from "../hooks/useApi";
import type { PaginatedResponse } from "../models/PaginatedResponse";

export const useProductService = () => {
  const { api } = useApi();

  const getProducts = async (page: number, pageSize: number=10) => {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Product>>>(`/product/list?pageNumber=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, data: { pageNumber: 0, pageSize: 0, totalRecords: 0, data: [] }, error: 'Failed to fetch products' };
    }
};

const getProductById = async (id: number) => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/product/${id}`);
        return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return { success: false, data: null, error: 'Failed to fetch product' };
    }
};

const updateProduct = async (formData: FormData) => {
  const response = await api.put<ApiResponse<Product>>(`/product/`, formData);
  return response.data;
};

const createProduct = async (formData: FormData) => {
  const response = await api.post<ApiResponse<Product>>("/product/create", formData,{
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

// const getCategories = async () => {
//   const response = await api.get<ApiResponse<Category[]>>("/Category/list");
//   return response.data.data || [];
// };

const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete<ApiResponse<void>>(`/product/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete failed:", err);
    return { success: false, error: "Network error" };
  }
};
    
return { getProducts, getProductById, updateProduct, createProduct,deleteProduct };
};
