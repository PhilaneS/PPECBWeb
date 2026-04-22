import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../../models/product";
import { useProductService } from "../../services/productService";


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
            console.error(`Error fetching product with id ${id}:`, error);
          }
        };
        loadProduct();
    }, [id, getProductById]);

    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      <img
        src={product.imageUrl || "../../assets/placeholder.png"}
        alt={product.name}
        style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px" }}
      />
      <p><strong>Category:</strong> {product.categoryName}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> R{product.price.toFixed(2)}</p>
      <p><strong>Code:</strong> {product.productCode}</p>
      <Link to={`/product/${product.id}/edit`}>

        <button style={{ marginTop: "1rem" }}>Edit Product</button>
      </Link>
       {/* 🔹 Back to Catalog button */}
      <Link to="/product">
        <button style={{ marginTop: "1rem" }}>Back to Catalog</button>
      </Link>
    </div>
    );
};