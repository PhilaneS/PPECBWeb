import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Category } from "../../models/Category";
import { useCategoryService } from "../../services/categoryService";
import { toast } from "react-toastify";

export const CategoryList = () => {
  const { getCategories } = useCategoryService();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
 <div className="p-6 flex flex-col items-center">
  <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
    <h2 className="text-xl font-semibold">Categories</h2>
    <Link
      to="/category/create"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + Add Category
    </Link>
  </div>

  <div className="w-full max-w-4xl">
    <table className="w-full border-collapse border text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Code</th>
          <th className="border px-4 py-2">Active</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.categoryId}>
            <td className="border px-4 py-2">{c.name}</td>
            <td className="border px-4 py-2">{c.categoryCode}</td>
            <td className="border px-4 py-2">{c.isActive ? "Yes" : "No"}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => navigate(`/category/${c.categoryId}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
};