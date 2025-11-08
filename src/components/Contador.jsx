import React, { useState } from "react";

const Contador = () => {
  // Declaramos la variable de estado
  const [contador, setContador] = useState(0);

  // Funciones para modificar el estado
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const reiniciar = () => setContador(0);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Ejemplo de useState en React</h2>
      <p style={{ fontSize: "20px" }}>Contador actual: {contador}</p>

      <button onClick={incrementar} style={{ margin: 5 }}>
        ➕ Incrementar
      </button>

      <button onClick={decrementar} style={{ margin: 5 }}>
        ➖ Decrementar
      </button>

      <button onClick={reiniciar} style={{ margin: 5 }}>
        🔁 Reiniciar
      </button>
    </div>
  );
};

export default Contador;
