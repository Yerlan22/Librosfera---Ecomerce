import { useEffect, useState } from "react";
import "./book.css";
import { useParams, Link } from "react-router-dom";
import { getBookById, getBooksByCategory } from "../../api/books";
import axiosInstance from "../../api/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Book() {
  const { id } = useParams();
  const { id_usuario } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(price);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);

        if (bookData?.id_categoría) {
          const related = await getBooksByCategory(bookData.id_categoría);
          const filtered = related
            .filter((b) => b.id !== bookData.id)
            .slice(0, 4);
          setRelatedBooks(filtered);
        }
      } catch (error) {
        console.error("Error al cargar libro:", error);
      }
    }

    fetchData();
  }, [id]);

  if (!book) return <div className="loading">Cargando...</div>;

  const handleAddToCart = async () => {
      try {
      console.log("ID del usuario:", id_usuario); 
        await axiosInstance.post(`/carrito/${id_usuario}`, {
          id_libro: book.id,
          cantidad: Number(quantity),
        });

        setShowAddModal(true);
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
      }
    };

  return (
    <div className="book-container">
      <div className="book-main">
        <div className="book-image">
          <img src={book.image || "/placeholder.svg"} alt={book.title} />
        </div>

        <div className="book-info">
          <h1>{book.title}</h1>
          <h2>{book.author || "Autor desconocido"}</h2>

          <div className="book-price">
            <span>Precio: {formatPrice(book.precio)}</span>
          </div>

          <div className="book-stock">
            Stock: <span>{book.stock > 0 ? "Disponible" : "Agotado"}</span>
          </div>

          <div className="book-quantity">
            <label>Cantidad:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <button className="btn-add-cart" onClick={handleAddToCart}>
            Agregar al carrito
          </button>

          <div className="book-description">
            <h3>Descripción</h3>
            <p>
              {book.descripcion ||
                "No hay descripción disponible para este libro."}
            </p>
          </div>
        </div>

        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-icon">📚</div>
              <h2>¡Libro añadido al carrito!</h2>
              <button
                className="modal-button"
                onClick={() => setShowAddModal(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="related-books">
        <h3>También podrían gustarte</h3>
        <div className="related-books-grid">
          {relatedBooks.map((b) => (
            <div key={b.id} className="related-book">
              <Link
                to={`/pages/book/${b.id}`}
                className="book-link"
                aria-label={`Ver detalles de ${b.title}`}
              >
                <img src={b.image || "/placeholder.svg"} alt={b.title} />
              </Link>
              <h4>{b.title}</h4>
              <p>{b.author}</p>
              <p className="related-price">{formatPrice(b.precio)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Book;
