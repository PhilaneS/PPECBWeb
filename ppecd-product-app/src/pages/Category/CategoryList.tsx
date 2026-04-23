import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Category } from "../../models/Category";
//import { useAuth } from "../../context/AuthContext";
import { useCategoryService } from "../../services/categoryService";
import { toast } from "react-toastify";

import {
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export const CategoryList = () => {
  //const {loggedIn} = useAuth();
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

  
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },

    { field: "categoryCode", headerName: "Code", flex: 1 },

    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={params.value ? "green" : "red"}>
          {params.value ? "Active" : "Inactive"}
        </Typography>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: any) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            navigate(`/category/${params.row.categoryId}`)
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  return (

    <Container maxWidth="lg" sx={{ mt: 4 }}>
      
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
      
        <Typography variant="h2" sx={{ mt: 3,  fontWeight: "bold"}}  align="center">
          Categories
        </Typography>

        <Button
          component={Link}
          to="/category/create"
          variant="contained"
        >
          + Add Category
        </Button>
      </Box>
      
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          getRowId={(row) => row.categoryId}
          loading={loading}
          
       
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          
          slots={{ toolbar: GridToolbar }}

          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};