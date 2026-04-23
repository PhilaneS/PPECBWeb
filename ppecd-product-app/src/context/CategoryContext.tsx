import { createContext, useContext, useEffect, useState } from "react";
import { useCategoryService } from "../services/categoryService";
import type { Category } from "../models/Category";
 import { useAuth } from "./AuthContext";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: true,
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getCategories } = useCategoryService();
  const { loggedIn } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadCategories = async () => {
        try {
          
            if(loggedIn)
            {
            const data = await getCategories();
            setCategories(data);
            }
          
        } catch (err) {
            console.error("Error loading categories:", err);
        } finally {
            setLoading(false);
        }
    };
    loadCategories();
  }, [getCategories]);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};  

