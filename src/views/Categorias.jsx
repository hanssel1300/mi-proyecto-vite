// src/views/Categorias.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../firebaseconfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import TablaCategorias from "../components/categorias/TablaCategorias";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";

const Categorias = () => {
  // Estados existentes
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nuevos estados para modal y formulario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

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

  // Manejador de cambios en inputs del formulario de nueva categoría
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar una nueva categoría
  const agregarCategoria = async () => {
    // Validar campos requeridos
    if (!nuevaCategoria.nombre || !nuevaCategoria.descripcion) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    // Cerrar modal de inmediato
    setMostrarModal(false);

    try {
      // Agregar a Firestore
      await addDoc(categoriasCollection, nuevaCategoria);
      // Limpiar campos del formulario
      setNuevaCategoria({ nombre: "", descripcion: "" });
      // Recargar lista
      await cargarCategorias();
      console.log("Categoría agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
      alert("Error al agregar la categoría: " + (error.message || error));
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

      {/* Modal de registro */}
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      {/* Tabla de categorías */}
      <TablaCategorias
        categorias={categorias}
        loading={loading}
        error={error}
        onRetry={cargarCategorias}
      />
    </Container>
  );

};

export default Categorias;




