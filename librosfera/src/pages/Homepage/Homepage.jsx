// Se importa React para poder definir y utilizar componentes funcionales en el proyecto.
import React from "react";

import "swiper/css";

// Se importa la hoja de estilos específica para la página principal (Homepage).
import "./Homepage.css";

// Se importa el componente BookCarousel, que renderiza un carrusel de libros destacados.
import BookCarousel from "../../components/BookCarousel/BookCarousel";

// Se importa el componente Valores, que muestra la sección de los valores de la empresa.
import Valores from "./components/Valores/Valores";

// Se importa el componente AutoresSection, que despliega una sección de autores destacados.
import AutoresSection from "./components/Autores/Autores";

import BannerCarousel from "../../components/BannerCarousel/BannerCarousel";

import Categories from "./components/Categories/Categories";

// Se define el componente funcional Home, el cual representa la página principal del sitio web.
function Home() {
  return (
    // Se estructura el contenido principal dentro de un elemento <main> con una clase de estilo.
    <main className="homepage-main">


    <BannerCarousel/>

    {/* Se inserta el primer carrusel de libros destacados, utilizando el componente BookCarousel. */}
      <BookCarousel title="Destacados" categoriaId={1} />

      {/* Se inserta un segundo carrusel de libros destacados, posiblemente para mostrar otra categoría o colección. */}
      <BookCarousel title="Para tí" categoriaId={3} />

      {/* Se agrega la sección "Conozca nuestros valores", donde se presentan los valores fundamentales de la empresa. */}
      <Valores />

      {/* Se muestra la sección de "Autores destacados", donde se presentan autores importantes para la librería. */}
      <AutoresSection />

      <Categories/>
    </main>
  );
}

// Se exporta el componente Home como exportación por defecto para poder utilizarlo en otras partes de la aplicación.
export default Home;
