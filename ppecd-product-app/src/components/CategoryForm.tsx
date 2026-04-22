import { useState } from "react";
import type { Category } from "../models/Category";
import { toast } from "react-toastify";

interface CategoryFormProps {
  initialValues?: Category;
  onSubmit: (values: Category) => void;
}

export const CategoryForm = ({ initialValues, onSubmit }: CategoryFormProps) => {
  const [formValues, setFormValues] = useState<Category>(
    initialValues || {
      categoryId: 0,
      name: "",
      categoryCode: "",
      isActive: false,
    }
  );
const categoryCodePattern = /^[A-Z]{3}[0-9]{3}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
      if (!categoryCodePattern.test(formValues.categoryCode)) {
    toast.error("Category Code must be in ABC123 format (3 letters + 3 digits).");
    return;
      }
    onSubmit(formValues);
    //toast.success("Category saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder="Category Name"
        required
        style={styles.input}
      />

      <input
        name="categoryCode"
        value={formValues.categoryCode}
        onChange={handleChange}
        placeholder="Category Code"
        required
        style={styles.input}
      />

      
      <label style={styles.checkboxContainer}>
        <input
          type="checkbox"
          name="isActive"
          checked={formValues.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button type="submit" style={styles.button}>
        {formValues.categoryId ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold" as const,
  },
};