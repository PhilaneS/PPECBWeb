import { useState } from "react";
import type { Category } from "../models/Category";

interface CategoryFormProps {
  initialValues?: Category;
  onSubmit: (values: Category) => void;
};

  
  export const  CategoryForm =({ initialValues, onSubmit }: CategoryFormProps) => {
  const [formValues, setFormValues] = useState<Category>(
    initialValues || { categoryId: 0, categoryName: "" ,CategoryCode:"",IsActive:false}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="categoryName"
        value={formValues.categoryName}
        onChange={handleChange}
        placeholder="Category Name"
        required
      />
      <button type="submit">{formValues.categoryId ? "Update" : "Add"} Category</button>
    </form>
  );
}