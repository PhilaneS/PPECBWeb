import api from "../api/axio";
import type { Product } from "../models/product";
import type { ApiResponse } from "../models/response";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      data: [],
      error: "Failed to fetch products"
    };
  }
};
