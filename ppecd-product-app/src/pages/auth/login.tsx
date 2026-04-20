
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { loginRequest } from "../../models/auth";
export const Login = () => {

    const {login} = useAuth();
    const navigate = useNavigate(); 
    const location = useLocation();

    const from = location.state?.from?.pathname || "/products";

    const handleLogin = async () => {
        const credentials : loginRequest = {
            email: "",
            password: ""
        }; 
        
        const result = await login(credentials);
        if (result.success) {
            navigate(from, { replace: true });
        }
    };


   return (
   <>
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Click to Log In</button>
    </div>
   </>
  );
}