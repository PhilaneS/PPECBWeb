import { useApi } from "../../hooks/useApi";
export const ProductList = () => {
  const { api } = useApi();

  const fetchProducts = async () => {
    const response = await api.get("/product/list");
    console.log(response.data);
  };

  return(
    <div>
       <h1>Product List</h1>
         <button onClick={fetchProducts}>Fetch Products</button>
    </div>
  );
}