import React from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import "./TablaCategorias.css";

const TablaCategorias = ({
  categorias,
  loading,
  error,
  onRetry,
  manejarEliminar,
  manejarEditar,
}) => {
  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" className="me-2" />
        <span className="fs-6">Cargando categorías...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-4">
        <Alert variant="danger">
          <strong>Error al cargar las categorías.</strong>
          <div className="mt-2">
            {error?.message ? <small>{error.message}</small> : null}
          </div>
        </Alert>
        <Button variant="primary" onClick={onRetry}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id}>
            <td>{categoria.nombre}</td>
            <td>{categoria.descripcion}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-1"
                onClick={() => manejarEditar(categoria)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="m-1"
                onClick={() => manejarEliminar(categoria)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaCategorias;

