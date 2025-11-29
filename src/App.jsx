import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Home from "./views/Home";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import Catalogo from "./views/Catalogo";
import ProyectoInfo from "./ProyectoInfo";
import "./App.css";

const App = () => {
  return (
    <div>
      {/* NAVBAR PROFESIONAL */}
      <Navbar expand="lg" style={{ backgroundColor: "#1e1e1e" }} variant="dark">
        <Container>
          
          {/* LOGO / TITULO */}
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", color: "#f0b400" }}>
            🛠️ Ferretería Golden
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
              <Nav.Link as={Link} to="/proyecto">Proyecto</Nav.Link>

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/proyecto" element={<ProyectoInfo />} />
      </Routes>
    </div>
  );
};

export default App;



