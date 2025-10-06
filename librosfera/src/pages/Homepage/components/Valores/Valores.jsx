// Se importa el archivo de estilos específico para la sección de valores
import "./Valores.css";

// Se define el componente funcional Valores
const Valores = () => {
  return (
    // Se crea el contenedor principal de la sección
    <div className="valores-container">
      {/* Se agrupan imagen y texto en un contenedor */}
      <div className="valores-content">
        {/* Se crea el contenedor de la imagen */}
        <div className="valores-image-container">
          {/* Se inserta una imagen representativa de la librería */}
          <img
            src="/images/Libreria.jpg"
            alt="Interior de la librería Librosfera"
            className="valores-image"
          />
        </div>

        {/* Se crea el contenedor para el contenido de texto */}
        <div className="valores-text">
          {/* Se muestra el título principal de la sección */}
          <h2 className="valores-title">Conozca nuestros valores</h2>

          {/* Se incluye el primer párrafo con un mensaje sobre la misión */}
          <p className="valores-paragraph">
            En Librosfera creemos que los libros son puentes hacia el
            conocimiento y la imaginación.
          </p>

          {/* Se incluye el segundo párrafo sobre los valores principales */}
          <p className="valores-paragraph">
            Siempre moviéndonos por la pasión de conectar a nuestros clientes
            con historias que inspiran y enseñan, a través de valores que
            reflejan nuestro compromiso con usted: calidad, cercanía e
            innovación.
          </p>

          {/* Se agrega un botón para dirigir a la sección "Sobre nosotros" */}
          <button className="valores-button">Sobre nosotros</button>
        </div>
      </div>
    </div>
  );
};

// Se exporta el componente para su uso en otras partes de la aplicación
export default Valores;
