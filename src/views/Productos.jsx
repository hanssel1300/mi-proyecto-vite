// src/views/Productos.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TablaProductos from "../components/productos/TablaProductos";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const productosCollection = collection(db, "productos");
  const categoriasCollection = collection(db, "categorias");

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Modales y formularios
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: null,
    stock: null,
    categoria: "",
    imagen: "",
  });

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  // --- CRUD y carga ---
  const cargarProductos = async () => {
    try {
      const consulta = await getDocs(productosCollection);
      const datosProductos = consulta.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(datosProductos);
      setProductosFiltrados(datosProductos);
      establecerPaginaActual(1); // resetear página al recargar
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const consulta = await getDocs(categoriasCollection);
      const datosCategorias = consulta.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCategorias(datosCategorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Buscar / filtrar (resetea pagina)
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtradas = productos.filter((producto) => {
      const nombreCat = categorias.find((c) => c.id === producto.categoria)?.nombre || "";
      return (
        String(producto.nombre || "").toLowerCase().includes(texto) ||
        String(producto.descripcion || "").toLowerCase().includes(texto) ||
        String(nombreCat || "").toLowerCase().includes(texto) ||
        String(producto.precio || "").includes(texto) ||
        String(producto.stock || "").includes(texto)
      );
    });
    setProductosFiltrados(filtradas);
    establecerPaginaActual(1);
  };

  // Agregar producto
  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const agregarProducto = async () => {
    if (
      !nuevoProducto.nombre ||
      !nuevoProducto.descripcion ||
      nuevoProducto.precio === null ||
      nuevoProducto.stock === null ||
      !nuevoProducto.categoria
    ) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }
    setMostrarModal(false);
    try {
      await addDoc(productosCollection, {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: nuevoProducto.precio,
        stock: nuevoProducto.stock,
        categoria: nuevoProducto.categoria,
        imagen: nuevoProducto.imagen || "",
      });
      setNuevoProducto({ nombre: "", descripcion: "", precio: null, stock: null, categoria: "", imagen: "" });
      await cargarProductos();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto: " + (error.message || error));
    }
  };

  // Editar producto
  const manejoCambioInputEditar = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const manejarEditar = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEditar(true);
  };

  const editarProducto = async () => {
    if (
      !productoEditado?.nombre ||
      !productoEditado?.descripcion ||
      productoEditado.precio === null ||
      productoEditado.stock === null ||
      !productoEditado?.categoria
    ) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }
    setMostrarModalEditar(false);
    try {
      const productoRef = doc(db, "productos", productoEditado.id);
      await updateDoc(productoRef, {
        nombre: productoEditado.nombre,
        descripcion: productoEditado.descripcion,
        precio: productoEditado.precio,
        stock: productoEditado.stock,
        categoria: productoEditado.categoria,
        imagen: productoEditado.imagen || "",
      });
      await cargarProductos();
      setProductoEditado(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto: " + (error.message || error));
    }
  };

  // Eliminar producto
  const manejarEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;
    try {
      const productoRef = doc(db, "productos", productoAEliminar.id);
      await deleteDoc(productoRef);
      await cargarProductos();
      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto: " + (error.message || error));
    }
  };

  // -- Paginación: calcular productos visibles en la página actual
  const totalElementos = productosFiltrados.length;
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = paginaActual * elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceInicio, indiceFin);

  return (
    <Container className="mt-4">
      <h4>Gestión de Productos</h4>

      <Row className="mb-3">
        <Col lg={3} md={4} sm={6} xs={12}>
          <Button className="mb-3" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Agregar producto
          </Button>
        </Col>

        <Col lg={5} md={8} sm={12} xs={12}>
          <CuadroBusquedas textoBusqueda={textoBusqueda} manejarCambioBusqueda={manejarCambioBusqueda} />
        </Col>
      </Row>

      <TablaProductos
        productos={productosPaginados}
        categorias={categorias}
        manejarEliminar={manejarEliminar}
        manejarEditar={manejarEditar}
      />

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      {/* Modales */}
      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejoCambioInput={manejoCambioInput}
        setNuevoProducto={setNuevoProducto}
        agregarProducto={agregarProducto}
        categorias={categorias}
      />

      <ModalEliminacionProducto
        mostrarModalEliminar={mostrarModalEliminar}
        setMostrarModalEliminar={setMostrarModalEliminar}
        productoAEliminar={productoAEliminar}
        eliminarProducto={eliminarProducto}
      />

      <ModalEdicionProducto
        mostrarModalEditar={mostrarModalEditar}
        setMostrarModalEditar={setMostrarModalEditar}
        productoEditado={productoEditado}
        manejoCambioInputEditar={manejoCambioInputEditar}
        setProductoEditado={setProductoEditado}
        editarProducto={editarProducto}
        categorias={categorias}
      />
    </Container>
  );
};

export default Productos;


