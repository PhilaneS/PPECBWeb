import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryForm } from "../../components/CategoryForm";
import { useCategoryService } from "../../services/categoryService";

export const AddCategory = () => {
  const { addCategory } = useCategoryService();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    
    try {
        const res = await addCategory(values);
        if (res.success) {
        toast.success("Category added successfully!");
        navigate("/category");
        } else {
        toast.error(res.error);
        }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to add category. Please try again.");
    }
  };

  return (
     <div className="p-6">
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
};