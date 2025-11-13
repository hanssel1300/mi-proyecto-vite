import React from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import "./TablaCategorias.css"; // <--- importa el CSS personalizado

const TablaCategorias = ({ categorias, loading, error, onRetry }) => {
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

  if (!categorias || categorias.length === 0) {
    return <p className="text-center">No hay categorías para mostrar.</p>;
  }

  return (
    <div className="mt-3">
      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm custom-table"  // 👈 clase personalizada
      >
        <thead className="table-dark">
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => (
            <tr key={categoria.id}>
              <td>{index + 1}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaCategorias;


