import { Routes,Route } from 'react-router-dom';
import {ProductList} from './pages/products/productList';
import { Login } from './pages/auth/login';
import { Navbar } from './pages/navBar/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProductDetailes } from './pages/products/productDetailes';
import {EditProduct} from './pages/products/EditProduct';
import {CreateProduct} from './pages/products/CreateProduct';
import { CategoryProvider } from './context/CategoryContext';
import { CategoryList } from './pages/Category/CategoryList';
import { AddCategory } from './pages/Category/AddCategory ';
import { EditCategory } from './pages/Category/EditCategory ';
import {UploadExcel} from "./pages/products/UploadExcel";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {  
  return (
    <>
     <CategoryProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />

        <Route path="/product/upload-excel" element={<ProtectedRoute><UploadExcel /></ProtectedRoute>}></Route>
        <Route path="/product" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetailes /></ProtectedRoute>} />
        <Route path="/product/:id/edit" element={<EditProduct />} /> 
        <Route path="/product/create" element={<CreateProduct />} /> 

       <Route path="/category" element={<CategoryList />} />
      <Route path="/category/create" element={<AddCategory />} />
      <Route path="/category/:id/" element={<EditCategory />} />
      </Routes>
    <ToastContainer position="bottom-left" autoClose={3000} />
    </CategoryProvider>
    </>
  )
}

export default App
