// src/views/Categorias.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TablaCategorias from "../components/categorias/TablaCategorias";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";

const Categorias = () => {
  // Estados para listado y manejo general
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para registro de categoría
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  // Estados para eliminación de categoría
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  // Estados para edición de categoría
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState(null);

  const categoriasCollection = collection(db, "categorias");

  // Carga las categorías desde Firestore
  const cargarCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const consulta = await getDocs(categoriasCollection);
      const datosCategorias = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(datosCategorias);
    } catch (err) {
      setError(err);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Registro: manejo de inputs para nueva categoría
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Registro: agregar categoría nueva
  const agregarCategoria = async () => {
    if (!nuevaCategoria.nombre || !nuevaCategoria.descripcion) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    setMostrarModal(false);
    try {
      await addDoc(categoriasCollection, nuevaCategoria);
      setNuevaCategoria({ nombre: "", descripcion: "" });
      await cargarCategorias();
      console.log("Categoría agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
      alert("Error al agregar la categoría: " + (error.message || error));
    }
  };

  // Eliminación: abrir modal eliminar con categoría seleccionada
  const manejarEliminar = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminar(true);
  };

  // Eliminación: eliminar categoría en Firestore
  const eliminarCategoria = async (id) => {
    try {
      await deleteDoc(doc(db, "categorias", id));
      await cargarCategorias();
      alert("Categoría eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("Error al eliminar categoría: " + error.message);
    }
  };

  // Edición: abrir modal editar con categoría seleccionada
  const manejarEditar = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setMostrarModalEditar(true);
  };

  // Edición: manejar cambios en inputs del formulario editar
  const manejoCambioInputEditar = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edición: actualizar categoría en Firestore
  const editarCategoria = async () => {
    if (!categoriaEditada?.nombre || !categoriaEditada?.descripcion) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    setMostrarModalEditar(false);
    try {
      const categoriaRef = doc(db, "categorias", categoriaEditada.id);
      await updateDoc(categoriaRef, {
        nombre: categoriaEditada.nombre,
        descripcion: categoriaEditada.descripcion,
      });
      await cargarCategorias();
      console.log("Categoría actualizada exitosamente.");
      setCategoriaEditada(null);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Error al actualizar la categoría: " + error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Gestión de Categorías</h3>

      {/* Botón para agregar categoría */}
      <Row>
        <Col lg={3} md={4} sm={4} xs={6}>
          <Button
            className="mb-3"
            style={{ width: "100%" }}
            onClick={() => setMostrarModal(true)}
          >
            Agregar categoría
          </Button>
        </Col>
      </Row>

      {/* Modal para registro */}
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      {/* Modal para eliminación */}
      <ModalEliminacionCategoria
        mostrarModalEliminar={mostrarModalEliminar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        categoriaAEliminar={categoriaAEliminar}
        eliminarCategoria={eliminarCategoria}
      />

      {/* Modal para edición */}
      <ModalEdicionCategoria
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        categoriaEditada={categoriaEditada}
        manejoCambioInputEditar={manejoCambioInputEditar}
        editarCategoria={editarCategoria}
      />

      {/* Tabla con botones editar y eliminar */}
      <TablaCategorias
        categorias={categorias}
        manejarEliminar={manejarEliminar}
        manejarEditar={manejarEditar}
        loading={loading}
        error={error}
        onRetry={cargarCategorias}
      />
    </Container>
  );
};

export default Categorias;





