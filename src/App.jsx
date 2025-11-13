import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Categorias from "./views/Categorias";
import "./App.css";

const App = () => {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/categorias">Categorías</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </div>
  );
};

export default App;


