import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryForm } from "../../components/CategoryForm";
import type { Category } from "../../models/Category";
import { useCategoryService } from "../../services/categoryService";

export const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCategories, editCategory } = useCategoryService();

  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      const found = data.find((c) => c.categoryId === Number(id));
      if(found)
        setCategory(found);
    };
    load();
  }, [id]);

  const handleSubmit = async (values: any) => { 
    const res = await editCategory(values);
    if (res.success) {
      toast.success("Category updated successfully");
      navigate("/category");
    } else {
      toast.error(res.error);
    }
  };

  if (!category) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div>
      <h1>Edit Category</h1>
      <CategoryForm initialValues={category} onSubmit={handleSubmit} />
    </div>
  );
};
