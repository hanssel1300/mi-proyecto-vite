import React from "react";
import Titulo from "../components/Titulo";

const Home = () => {
  return (
    <>
      <div style={{ padding: 20 }}>
        <Titulo texto="Bienvenido a mi Proyecto React con Vite" />
        <p>Este es el contenido principal de la página de inicio.</p>
      </div>
    </>
  );
};

export default Home;
