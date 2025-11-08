import React from "react";
import Titulo from "../components/Titulo";
import Contador from "../components/Contador";
import FirestoreDemo from "../components/FirestoreDemo";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <Titulo texto="Bienvenido a mi Proyecto React con Vite" />
      <p>Este es el contenido principal de la página de inicio.</p>

      <hr />

      <Contador />

      <hr />

      {/* Aquí mostramos el demo de Firestore */}
      <FirestoreDemo />
    </div>
  );
};

export default Home;
