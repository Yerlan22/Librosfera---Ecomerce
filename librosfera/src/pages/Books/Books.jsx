import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Books.css";
import { getBooksByCategory } from "../../api/books";
import { getAllCategories } from "../../api/categories";

function Books() {
  const { categoriaId } = useParams();
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!categoriaId) return;

    async function fetchData() {
      try {
        const [booksData, categoriesData] = await Promise.all([
          getBooksByCategory(categoriaId),
          getAllCategories(),
        ]);

        const category = categoriesData.find(
          (cat) => String(cat.id) === String(categoriaId)
        );
        setCategoryName(category?.nombre || "Categoría desconocida");

        const adaptedBooks = booksData.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author || "Autor desconocido",
          price: formatPrice(book.precio),
          image: book.image || "/placeholder.svg",
        }));

        setBooks(adaptedBooks);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    fetchData();
  }, [categoriaId]);

  return (
    <main className="books-container">
      <h2>{categoryName}</h2>

      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-image-container">
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="book-image"
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-price">{book.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando libros...</p>
        )}
      </div>
    </main>
  );
}

export default Books;
