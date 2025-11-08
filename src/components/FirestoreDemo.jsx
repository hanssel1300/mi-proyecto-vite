// src/components/FirestoreDemo.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const FirestoreDemo = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "prueba"));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocs(items);
        console.log("Docs obtenidos:", items);
      } catch (err) {
        console.error("Error leyendo Firestore:", err);
      }
    };
    fetchData();
  }, []);

  const agregar = async () => {
    try {
      const docRef = await addDoc(collection(db, "prueba"), {
        nombre: "Hanssel",
        fecha: new Date().toISOString()
      });
      console.log("Documento agregado con ID:", docRef.id);
      // Actualizar lista (simple): volver a leer
      const snapshot = await getDocs(collection(db, "prueba"));
      setDocs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error agregando doc:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Prueba Firestore</h3>
      <button onClick={agregar}>Agregar documento de prueba</button>
      <ul>
        {docs.map(d => (
          <li key={d.id}>{d.id} — {d.nombre} — {d.fecha}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreDemo;
