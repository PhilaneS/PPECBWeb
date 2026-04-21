import { Link } from "react-router-dom";
import type { Product } from "../models/product";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    return (
  <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <img
        src={product.imageUrl || "../assets/placeholder.png"}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
      />
      <h3 style={{ margin: "0.5rem 0" }}>{product.name}</h3>
      <p style={{ color: "#555" }}>{product.categoryName}</p>
      <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
        
      <Link to={`/product/${product.id}`}>
        <button style={{ marginTop: "0.5rem" }}>View Details</button>
      </Link>
      
      <Link to={`/product/`}>
        <button style={{ marginTop: "0.5rem" }}
        onClick={() => onDelete(product.id)}>Delete</button>
      </Link>
    </div>
    );
}