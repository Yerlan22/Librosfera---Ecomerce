import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookCarousel.css";
import { getBooksByCategory } from "../../api/books";

const BookCarousel = ({ title, categoriaId }) => {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [booksToShow, setBooksToShow] = useState(5);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateBooksToShow = () => {
      const width = window.innerWidth;
      if (width <= 400) setBooksToShow(1);
      else if (width <= 576) setBooksToShow(2);
      else if (width <= 768) setBooksToShow(3);
      else if (width <= 992) setBooksToShow(4);
      else setBooksToShow(5);
    };
    updateBooksToShow();
    window.addEventListener("resize", updateBooksToShow);
    return () => window.removeEventListener("resize", updateBooksToShow);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(price);
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        console.log("Cargando libros para la categoría:", categoriaId);
        const data = await getBooksByCategory(categoriaId);
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);

        const formattedBooks = shuffled.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author || "Autor desconocido",
          price: formatPrice(book.precio),
          img: book.image || "/placeholder.svg",
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Error al cargar libros:", error);
      }
    }

    fetchBooks();
  }, [categoriaId]);

  const totalBooks = books.length;

  const moveCarousel = (direction) => {
    setActiveIndex((prevIndex) => {
      let newIndex = (prevIndex + direction) % totalBooks;
      if (newIndex < 0) newIndex = totalBooks - 1;
      return newIndex;
    });
  };

  const getVisibleBooks = () => {
    if (books.length === 0) return [];
    const visibleBooks = [];

    for (let i = 0; i < booksToShow; i++) {
      if (i >= totalBooks) break;
      const bookIndex = (activeIndex + i) % totalBooks;
      visibleBooks.push({
        ...books[bookIndex],
        originalIndex: bookIndex,
      });
    }

    return visibleBooks;
  };

  return (
    <div className="container">
      <h2>{title}</h2>
      <div className="carousel-container">
        <div className="carousel-arrow prev" onClick={() => moveCarousel(-1)}>
          &#10094;
        </div>
        <div className="carousel-arrow next" onClick={() => moveCarousel(1)}>
          &#10095;
        </div>
        <div className="carousel" ref={carouselRef}>
          {getVisibleBooks().map((book, index) => (
            <div
              className="book"
              key={`bookCarousel-${book.originalIndex}-${index}`}
            >
              <div className="bookCarousel-cover">
                <Link
                  to={`/pages/book/${book.id}`}
                  className="bookCarousel-link"
                  aria-label={`Ver detalles de ${book.title}`}
                >
                  <img src={book.img || "/placeholder.svg"} alt={book.title} />
                </Link>
              </div>
              <div className="bookCarousel-info">
                <div className="bookCarousel-title" title={book.title}>
                  {book.title}
                </div>
                <div className="bookCarousel-author" title={book.author}>
                  {book.author}
                </div>
                <div className="bookCarousel-price">{book.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;
