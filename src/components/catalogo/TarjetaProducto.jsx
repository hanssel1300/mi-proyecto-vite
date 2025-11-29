// src/components/catalogo/TarjetaProducto.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const TarjetaProducto = ({ producto, categorias }) => {
  const nombreCat = categorias.find((c) => c.id === producto.categoria)?.nombre || "Sin categoría";

  return (
    <Card className="h-100 shadow-sm">
      {producto.imagen ? (
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{ height: 180, objectFit: "cover" }}
        />
      ) : (
        <div style={{
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#888"
        }}>
          Sin imagen
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1" style={{ fontSize: 16 }}>{producto.nombre}</Card.Title>
        <Card.Text className="text-muted small mb-2" style={{ minHeight: 38 }}>
          {producto.descripcion}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>${producto.precio}</strong>
            <small className="text-muted">Stock: {producto.stock}</small>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{nombreCat}</small>
            <Button variant="outline-primary" size="sm">Ver</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaProducto;
