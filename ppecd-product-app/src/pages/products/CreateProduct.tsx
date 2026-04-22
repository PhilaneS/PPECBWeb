import { useNavigate } from "react-router-dom";
import { useProductService } from "../../services/productService";
import ProductForm from "../../components/ProductForm";

export const CreateProduct =() => {
  const { createProduct } = useProductService();
  const navigate = useNavigate();
  
    const handleCreate = async (formData: FormData) => {
        const response = await createProduct(formData);
        if (response.success) {
            navigate(`/product/${response.data?.id}`); 
        } else {
            alert("Failed to create product: " + response.error);
        }   
    };



  return (
     <div style={{ padding: "2rem" }}>      
      <ProductForm onSubmit={handleCreate} mode="create" />
    </div>
  );
}
