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
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState(null);

  const categoriasCollection = collection(db, "categorias");

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
      setCategoriasFiltradas(datosCategorias);
    } catch (err) {
      setError(err);
      setCategorias([]);
      setCategoriasFiltradas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = categorias.filter(
      (categoria) =>
        categoria.nombre.toLowerCase().includes(texto) ||
        categoria.descripcion.toLowerCase().includes(texto)
    );
    setCategoriasFiltradas(filtradas);
  };

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const manejarEliminar = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminar(true);
  };

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

  const manejarEditar = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setMostrarModalEditar(true);
  };

  const manejoCambioInputEditar = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            style={{ width: "100%" }}
            onClick={() => setMostrarModal(true)}
          >
            Agregar categoría
          </Button>
        </Col>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />
      <ModalEliminacionCategoria
        mostrarModalEliminar={mostrarModalEliminar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        categoriaAEliminar={categoriaAEliminar}
        eliminarCategoria={eliminarCategoria}
      />
      <ModalEdicionCategoria
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        categoriaEditada={categoriaEditada}
        manejoCambioInputEditar={manejoCambioInputEditar}
        editarCategoria={editarCategoria}
      />

      <TablaCategorias
        categorias={categoriasFiltradas}
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







