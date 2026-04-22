import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../../models/product";
import { useProductService } from "../../services/productService";
import ProductForm from "../../components/ProductForm";

export const EditProduct =()=> {
  const { id } = useParams<{ id: string }>();
  const { getProductById, updateProduct } = useProductService();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const response = await getProductById(parseInt(id!));
      if (response.success && response.data) {
        setProduct(response.data);
      }
    };
    loadProduct();
  }, [getProductById, id]);

  const handleUpdate = async (formData: FormData) => {

    for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
    const response = await updateProduct(formData);
    if (response.success) {
      navigate(`/product/${id}`);      
    }
     else {
            alert("Failed to update product: " + response.error);
        }   
  };


  if (!product) return <p>Loading...</p>;

  //console.log(product);
  return (
    <div style={{ padding: "2rem" }}>
      <ProductForm onSubmit={handleUpdate} initialValues={product} mode="edit" />
    </div>
  );
}
