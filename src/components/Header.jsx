// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/categorias" style={{ marginRight: 10 }}>Categorías</Link>
      <Link to="/productos">Productos</Link>
    </nav>
  );
};

export default Header;
