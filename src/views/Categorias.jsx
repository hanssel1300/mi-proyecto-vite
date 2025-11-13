import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import TablaCategorias from "../components/categorias/TablaCategorias";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Gestión de Categorías</h3>
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



