// src/ProyectoInfo.jsx
import React from "react";

const ProyectoInfo = () => {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Sistema Web para Ferretería Golden</h2>
      <p style={{ textAlign: "center", color: "#6b7280" }}>Universidad Nacional de Ingeniería (UNI)</p>

      <div style={{ border: "1px solid #e5e7eb", padding: 18, borderRadius: 8, marginTop: 20 }}>
        <h4>Datos del proyecto</h4>
        <p><strong>Centro:</strong> Centro Universitario Regional UNI-Juigalpa</p>
        <p><strong>Dirección:</strong> TELETÓN 1 C. al sur y 250 mts al oeste</p>
        <p><strong>Integrantes:</strong> Hanssel Jacobo Miranda Díaz, Sheyla Marleth López Pérez</p>
        <p><strong>Docente:</strong> Eliab Javier Selva Cruz</p>
        <p><strong>Fecha:</strong> 7 de noviembre de 2025</p>
      </div>

      <div style={{ marginTop: 18 }}>
        <h4>Planteamiento del problema</h4>
        <p>
          Las ferreterías tradicionales gestionan ventas e inventario manualmente,
          lo que genera errores, pérdida de información y dificulta la atención al cliente.
          El sistema digital propuesto facilita la gestión y ofrece un catálogo en línea.
        </p>
      </div>
    </div>
  );
};

export default ProyectoInfo;
