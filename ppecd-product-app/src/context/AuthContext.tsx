import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { loginRequest } from '../models/auth';
import type { ApiResponse } from '../models/response';
import { login as authLogin } from '../services/AuthService';  // Import the service
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  token: string | null;
  login: (credentials: loginRequest) => Promise<ApiResponse<string>>;  // Updated return type
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      //This will be resolved after token refresh emplemetation
      setLoggedIn(true);
      setToken(storedToken);
    }
  }, []);


  const login = async (credentials: loginRequest): Promise<ApiResponse<string>> => {
    const result = await authLogin(credentials);
    if (result.success) {
      setLoggedIn(true);
      setToken(result.data); // Store the token in state
      localStorage.setItem("authToken", result.data); // Store the token in localStorage
       navigate("/product/list");
    }
    return result;
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("authToken");
     navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};