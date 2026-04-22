import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import type { Product } from "../models/product";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = () => {
    onDelete(product.id);
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={product.imageUrl || "../../assets/placeholder.png"}
          alt={product.name}
        />

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{product.name}</Typography>
         <Chip
            label={product.categoryName}
            size="small"
            color="primary"
            sx={{ mt: 1, mb: 1 }}
          />

          <Typography variant="body2" noWrap>
            {product.description}
          </Typography>

          <Typography variant="h6" color="primary" sx={{ mt:1}}>
            R{product.price.toFixed(2)}
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              View
            </Button>

            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/product/${product.id}/edit`)}
            >
              Edit
            </Button>
          </Box>

          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Product</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{product.name}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}