import { useState } from "react";
import type { Category } from "../models/Category";
import { toast } from "react-toastify";

import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryCodePattern.test(formValues.categoryCode)) {
      toast.error("Category Code must be in ABC123 format (3 letters + 3 digits).");
      return;
    }

    onSubmit(formValues);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        
        <TextField
          name="name"
          label="Category Name"
          value={formValues.name}
          onChange={handleChange}
          required
          fullWidth
        />
       
        <TextField
          name="categoryCode"
          label="Category Code"
          value={formValues.categoryCode}
          onChange={handleChange}
          placeholder="ABC123"
          required
          fullWidth
        />
       
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={formValues.isActive}
              onChange={handleChange}
            />
          }
          label="Active"
        />
      
        <Button type="submit" variant="contained" size="large">
          {formValues.categoryId ? "Update Category" : "Add Category"}
        </Button>
      </Box>
    </Paper>
  );
};