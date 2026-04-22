import { useState, useEffect } from "react";
import type { Product } from "../models/product";
import { useCategory } from "../context/CategoryContext";

import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  mode?: "create" | "edit";
}

export default function ProductForm({
  initialValues,
  onSubmit,
  mode = "create",
}: ProductFormProps) {
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.imageUrl || null
  );

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      const selected = categories.find((c) => c.categoryId === Number(value));
      if (selected) {
        setFormValues({
          ...formValues,
          categoryId: selected.categoryId,
          categoryName: selected.name,
        });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("Name", formValues.name);
    formData.append("Description", formValues.description || "");
    formData.append("Price", formValues.price.toString());
    formData.append("CategoryId", formValues.categoryId.toString());
    formData.append("CategoryName", formValues.categoryName);

    if (mode === "edit" && initialValues?.id) {
      formData.append("Id", initialValues.id.toString());
      formData.append("RowVersion", initialValues.rowVersion.toString());
    }

    if (file) {
      formData.append("Image", file);
    }

    await onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 500, mx: "auto", mt: 2 }}>      
      
       <Typography variant="h5" sx={{fontWeight:"bold", align:"center", mb:2}}  >
       {mode === "edit" ?
        "Edit Product" : "Add New Product"
        }
      </Typography> 

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >        
        <TextField
          name="name"
          label="Product Name"
          value={formValues.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name="description"
          label="Description"
          value={formValues.description || ""}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
       
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formValues.price}
          onChange={handleChange}
          required
          fullWidth
        />
       
        <TextField
          select
          name="categoryId"
          label="Category"
          value={formValues.categoryId || ""}
          onChange={handleChange}
          required
          fullWidth
        >
          <MenuItem value="">Select Category</MenuItem>
          {!loading &&
            categories.map((c) => (
              <MenuItem key={c.categoryId} value={c.categoryId}>
                {c.name}
              </MenuItem>
            ))}
        </TextField>
      
        <Button variant="outlined" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
       
        {previewUrl && (
          <Box sx={{  textAlign: "center" }}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Image Preview
            </Typography>
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Box>
        )}
      
        <Button type="submit" variant="contained" size="large">
          {mode === "edit" ? "Save Changes" : "Create Product"}
        </Button>
      </Box>
    </Paper>
  );
}