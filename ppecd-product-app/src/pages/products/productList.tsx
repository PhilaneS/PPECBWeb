import { useEffect, useState } from "react";
import { useProductService } from "../../services/productService";
import type { Product } from "../../models/product";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

export const ProductList = () => {
    const { getProducts, deleteProduct } = useProductService();
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
    setProducts(products.filter(p => p.id !== id));
  } else {
    alert(response.error || "Failed to delete product");
  }
};
  const totalPages = Math.ceil(totalRecords / pageSize);

  return(
 <div>
      <h1>Product Catalog</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))}
      </div>
      <Link to="/product/create">
        <button style={{ marginBottom: "1rem" }}>Add Product</button>
        </Link>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}