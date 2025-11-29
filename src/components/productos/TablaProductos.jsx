// src/components/productos/TablaProductos.jsx
import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaProductos = ({ productos, categorias, manejarEliminar, manejarEditar }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center">No hay productos para mostrar.</td>
          </tr>
        ) : (
          productos.map((producto) => {
            const nombreCat = categorias.find((c) => c.id === producto.categoria)?.nombre || "Sin categoría";
            return (
              <tr key={producto.id}>
                <td style={{ width: 80 }}>
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>{producto.nombre}</td>
                <td style={{ maxWidth: 240, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {producto.descripcion}
                </td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{nombreCat}</td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-1" onClick={() => manejarEditar(producto)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm" className="m-1" onClick={() => manejarEliminar(producto)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default TablaProductos;


