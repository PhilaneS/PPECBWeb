import { useState, useEffect } from "react";
import type { Product } from "../models/product";
import { useCategory } from "../context/CategoryContext";

interface ProductFormProps {
  initialValues?: Product; 
  onSubmit: (formData: FormData) => Promise<void>;
  mode?: "create" | "edit";
}

export default function ProductForm({ initialValues, onSubmit, mode = "create" }: ProductFormProps) {
    const { categories, loading } = useCategory();
  const [formValues, setFormValues] = useState(
    initialValues || {
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      categoryName: "",
      ProductCode: "",
      RowVersion: [],
    }
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.imageUrl || null);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    let selectedText = "";
    if (name === "categoryId") {
        if (e.target instanceof HTMLSelectElement) {
            selectedText = e.target.options[e.target.selectedIndex].text;
        }
     console.log("Selected categoryId:", value, "Selected categoryName:", selectedText);
      const selected = categories.find(c => c.categoryId === Number(value));
      if (selected) {
        setFormValues({ ...formValues, categoryId: selected.categoryId, categoryName: selectedText });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("Name", formValues.name);
    formData.append("Description", formValues.description || "");
    formData.append("Price", formValues.price.toString());
    formData.append("CategoryId", formValues.categoryId.toString());
    formData.append("CategoryName", formValues.categoryName);
   
    if (mode === "edit" && initialValues?.id) {
      formData.append("Id", initialValues?.id.toString());
      formData.append("RowVersion",initialValues.rowVersion.toString())
    }
    if (file) {
      formData.append("Image", file);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
      <input name="name" value={formValues.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={formValues.description || ""} onChange={handleChange} placeholder="Description" />
      <input name="price" type="number" value={formValues.price} onChange={handleChange} placeholder="Price" required />

      <select name="categoryId" value={formValues.categoryId.toString()} onChange={handleChange} required>
        <option value="">Select Category</option>
        {!loading && categories.map((c, index) => (
          <option key={`${c.categoryId}-${index}`} value={c.categoryId.toString()}>{c.name}</option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl && (
        <div>
          <p>Image Preview:</p>
          <img src={previewUrl} alt="Preview" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        </div>
      )}

      <button type="submit">{mode === "edit" ? "Save Changes" : "Create Product"}</button>
    </form>
  );
}