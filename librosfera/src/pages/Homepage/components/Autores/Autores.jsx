import React from "react";

import "./Autores.css";

const Autor = ({ nombre, imagen }) => {
  return (
    <div className="autor-card">
      <div className="autor-image-container">
        <img
          src={imagen || "/placeholder.svg"}
          alt={`Foto de ${nombre}`}
          className="autor-image"
        />
      </div>

      <h3 className="autor-nombre">{nombre}</h3>

      <button className="autor-button">Ver colección</button>
    </div>
  );
};

const AutoresSection = () => {
  const autores = [
    {
      nombre: "George Orwell",
      imagen: "/images/Autores/Autor1.jpeg",
    },
    {
      nombre: "Franz Kafka",
      imagen: "/images/Autores/Autor2.jpg",
    },
    {
      nombre: "Albert Camus",
      imagen: "/images/Autores/Autor3.jpeg",
    },
  ];

  return (
    <div className="autores-container">
      <h2 className="autores-title">Autores destacados</h2>

      <div className="autores-grid">
        {autores.map((autor, index) => (
          <Autor key={index} nombre={autor.nombre} imagen={autor.imagen} />
        ))}
      </div>
    </div>
  );
};

export default AutoresSection;
