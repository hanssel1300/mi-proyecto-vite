import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import "./App.css";

const App = () => {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/categorias" style={{ marginRight: 10 }}>Categorías</Link>
        <Link to="/productos">Productos</Link> {/* ← AGREGADO */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </div>
  );
};

export default App;



