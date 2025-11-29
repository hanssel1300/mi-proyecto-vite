// src/views/Home.jsx
import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const [contador, setContador] = useState(0);

  return (
    <Container className="mt-4">

      {/* ENCABEZADO */}
      <div className="text-center mb-4">
        <h1 style={{ color: "#d4a106", fontWeight: "bold" }}>
          🔧 Ferretería Golden
        </h1>
        <p className="text-muted" style={{ fontSize: 18 }}>
          Todo en herramientas, materiales y suministros para tu proyecto.
        </p>
      </div>

      {/* SECCIÓN DESTACADA */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow">
            <Card.Body className="text-center">
              <h4 className="mb-3" style={{ fontWeight: "bold" }}>
                Bienvenido a nuestro sistema
              </h4>
              <p className="text-muted">
                Explora nuestro catálogo, gestiona productos y descubre nuevas
                herramientas disponibles.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* GRID DE SERVICIOS */}
      <Row className="mb-4">

        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h5>🛠 Catálogo de productos</h5>
              <p className="text-muted small">
                Explora herramientas, materiales y accesorios disponibles.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h5>📦 Inventario</h5>
              <p className="text-muted small">
                Control de existencias para cada producto.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h5>🔍 Búsquedas inteligentes</h5>
              <p className="text-muted small">
                Encuentra productos por nombre, categoría o descripción.
              </p>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* DEMO DE CONTADOR */}
      <Row>
        <Col md={12}>
          <Card className="p-3 shadow-sm">
            <h5 className="mb-3">Ejemplo de useState en React</h5>

            <p className="fw-bold">Contador actual: {contador}</p>

            <div className="d-flex gap-2">
              <Button variant="success" onClick={() => setContador(contador + 1)}>
                ➕ Incrementar
              </Button>
              <Button variant="warning" onClick={() => setContador(contador - 1)}>
                ➖ Decrementar
              </Button>
              <Button variant="secondary" onClick={() => setContador(0)}>
                🔁 Reiniciar
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;


