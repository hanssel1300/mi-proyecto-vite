// src/components/categorias/ModalEliminacionCategoria.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCategoria = ({
  mostrarModalEliminar,
  setMostrarModalEliminar,
  categoriaAEliminar,
  eliminarCategoria,
}) => {
  const handleClose = () => setMostrarModalEliminar(false);

  const confirmarEliminacion = () => {
    eliminarCategoria(categoriaAEliminar.id);
    setMostrarModalEliminar(false);
  };

  return (
    <Modal show={mostrarModalEliminar} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Está seguro que desea eliminar la categoría{" "}
        <strong>{categoriaAEliminar?.nombre}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCategoria;
