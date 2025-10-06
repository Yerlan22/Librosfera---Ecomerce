import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  // Array de datos de las categorías
  const categories = [
    {
      id: 1,
      image: "/images/Categories/Clasico.png?height=300&width=400",
      title: "Clásicos",
    },
    {
      id: 2,
      image: "/images/Categories/CienciaFiccion.jpeg?height=300&width=400",
      title: "Ciencia ficción",
    },
    {
      id: 3,
      image: "/images/Categories/Horror.jpg?height=300&width=400",
      title: "Horror",
    },
    {
      id: 4,
      image: "/images/Categories/Fantasía.jpeg?height=300&width=400",
      title: "Fantasía",
    },
    {
      id: 5,
      image: "/images/Categories/Juvenil.jpeg?height=300&width=400",
      title: "Juvenil",
    },
    {
      id: 6,
      image: "/images/Categories/Niños.jpeg?height=300&width=400",
      title: "Libros para niños",
    },
  ];

  return (
    <div className="explore-categories">
      <h2 className="explore-title">Explorar categorías</h2>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/books/${category.id}`} // Enlace dinámico basado en el ID de la categoría
            className="category-link"
            key={category.id}
          >
            <div className="category-card">
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="category-overlay">
                  <div className="view-centers-btn">
                    {category.title}
                    <span className="arrow-icon">&#10095;</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
