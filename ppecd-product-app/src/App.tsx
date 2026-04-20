import { Routes,Route } from 'react-router-dom';
import {ProductList} from './pages/products/productList';
import { Login } from './pages/auth/login';
import { Navbar } from './pages/navBar/NavBar';
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
