import { useEffect, useState } from "react";
import { useProductService } from "../../services/productService";
import type { Product } from "../../models/product";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export const ProductList = () => {
  const { getProducts, deleteProduct,downloadExcel } = useProductService();
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts(pageNumber, pageSize);
        if (response.success && response.data) {
          setProducts(response.data.data);
          setTotalRecords(response.data.totalRecords);
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts([]);
      }
    };

    loadProducts();
  }, [getProducts, pageNumber, pageSize]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const response = await deleteProduct(id);
    if (response.success) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert(response.error || "Failed to delete product");
    }
  };

    const handleDownload = async () => {
    try {
      const blob = await downloadExcel();

      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "products.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Product Catalog
        </Typography>
        <Button  startIcon={<DownloadIcon />}
      onClick={handleDownload}
        sx={{
        borderRadius: 2,
        textTransform: "none",
        px: 3,
      }}
          variant="contained"
        >
          Download
        </Button>
        <Button
          component={Link}
          to="/product/create"
          variant="contained"
        >
          + Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={p.id}>
            <ProductCard product={p} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt:5 }}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, value) => setPageNumber(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};