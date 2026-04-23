import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export const Navbar = () => {
  const { loggedIn, logout } = useAuth();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo-ppecb.png" alt="Company Logo" style={{ height: 40 }} />
        </Box>

        {loggedIn && (
          <Box sx={{ display: "flex", gap: 2 }}>
            
            <Button
              component={NavLink}
              to="/"
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/product/upload-excel"
              sx={{ textTransform: "none" }}
            >
              Upload Execell
            </Button>

            <Button
              component={NavLink}
              to="/category"
              sx={{ textTransform: "none" }}
            >
              Category
            </Button>

            <Button
              component={NavLink}
              to="/product"
              sx={{ textTransform: "none" }}
            >
              Products
            </Button>

            <Button
              onClick={logout}
              color="error"
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};