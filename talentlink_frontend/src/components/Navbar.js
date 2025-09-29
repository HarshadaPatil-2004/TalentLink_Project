import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>TalentLink</h2>

      <button onClick={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>☰</button>

      <div style={{ ...styles.links, display: menuOpen ? "flex" : "flex" }}>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/profile" style={styles.profileLink}>Profile</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #4f46e5, #6366f1)",
    padding: "15px 30px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: { fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" },
  menuButton: {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    display: "none",
  },
  links: { display: "flex", gap: "20px", alignItems: "center" },
  link: { color: "white", textDecoration: "none", fontSize: "16px" },
  profileLink: {
    backgroundColor: "white",
    color: "#4f46e5",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;
