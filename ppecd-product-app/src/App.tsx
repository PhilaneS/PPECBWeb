import { Routes,Route } from 'react-router-dom';
import {ProductList} from './pages/products/productList';
import { Login } from './pages/auth/login';
import { Navbar } from './pages/navBar/NavBar';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { ProductDetailes } from './pages/products/productDetailes';
import {EditProduct} from './pages/products/EditProduct';
import {CreateProduct} from './pages/products/CreateProduct';
import { CategoryProvider } from './context/CategoryContext';


function App() {
  return (
    <>
     <CategoryProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetailes /></ProtectedRoute>} />
        <Route path="/product/:id/edit" element={<EditProduct />} /> 
        <Route path="/product/create" element={<CreateProduct />} /> 
      </Routes>
    
    </CategoryProvider>
    </>
  )
}

export default App
