import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { loggedIn, logout } = useAuth() ;

  return (
    <nav style={styles.navbar}>
      {/* Logo on the left */}
      <div style={styles.logo}>
        <img src="/logo.png" alt="Company Logo" style={styles.logoImg} />
      </div>

      {/* Links on the right */}
      <div style={styles.links}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "blue" : styles.link.color
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/product"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "blue" : styles.link.color
          })}
        >
          Products
        </NavLink>

        {!loggedIn ? (
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "blue" : styles.link.color
            })}
          >
            Login
          </NavLink>
        ) : (
          <button onClick={logout} style={styles.link}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd"
  },
  logo: { flex: 1 },
  logoImg: { height: "40px" },
  links: { flex: 1, display: "flex", justifyContent: "flex-end" },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    marginLeft: "20px",
    cursor: "pointer"
  }
};