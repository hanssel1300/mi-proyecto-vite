// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{
      padding: "12px 20px",
      borderBottom: "1px solid #e6e6e6",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Logo simple (texto) */}
        <div style={{
          fontWeight: 700,
          fontSize: 18,
          color: "#1f2937"
        }}>
          Ferretería <span style={{ color: "#c4892c" }}>Golden</span>
        </div>
        <div style={{ color: "#6b7280", fontSize: 14 }}>
          Sistema Web - UNI 2025
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#111827", marginRight: 8 }}>Home</Link>
        <Link to="/categorias" style={{ textDecoration: "none", color: "#111827", marginRight: 8 }}>Categorías</Link>
        <Link to="/productos" style={{ textDecoration: "none", color: "#111827", marginRight: 8 }}>Productos</Link>
        <Link to="/catalogo" style={{ textDecoration: "none", color: "#111827" }}>Catálogo</Link>
      </div>
    </nav>
  );
};

export default Header;
