import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCategoria = ({
  mostrarModalEditar,
  setMostrarModalEditar,
  categoriaEditada,
  manejoCambioInputEditar,
  editarCategoria,
}) => {
  if (!categoriaEditada) return null;

  const handleClose = () => setMostrarModalEditar(false);

  return (
    <Modal show={mostrarModalEditar} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreCategoria">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={categoriaEditada.nombre}
              onChange={manejoCambioInputEditar}
              placeholder="Ingrese nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionCategoria">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={categoriaEditada.descripcion}
              onChange={manejoCambioInputEditar}
              placeholder="Ingrese descripción"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="warning" onClick={editarCategoria}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCategoria;
