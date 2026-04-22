import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../../models/product";
import { useProductService } from "../../services/productService";

import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Chip,
  Divider,
  Stack,
} from "@mui/material";

export const ProductDetailes = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { getProductById } = useProductService();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductById(parseInt(id!));
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadProduct();
  }, [id, getProductById]);

  if (!product) {
    return (
      <Box  sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

        <Typography variant="h5" sx={{fontWeight:"bold", textAlign:"center"}} >
          {product.name}
        </Typography>

        <Box sx={{textAlign:"center", mt:1}} >
          <Chip label={product.categoryName} color="primary" size="small" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Box
            component="img"
            src={product.imageUrl || "../../assets/placeholder.png"}
            alt={product.name}
            sx={{
              width: 220,
              height: 220,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Box>

        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Description:</strong> {product.description}
          </Typography>

          <Typography variant="h6" color="primary">
            R {product.price.toFixed(2)}
          </Typography>

          <Typography variant="body2">
            <strong>Code:</strong> {product.productCode}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} sx={{ justifyContent:"center" }} >
          <Button
            variant="contained"
            component={Link}
            to={`/product/${product.id}/edit`}
            size="small"
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/product"
            size="small"
          >
            Back
          </Button>
        </Stack>

      </Paper>
    </Container>
  );
};