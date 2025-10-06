import './CartView.css';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { getCartByUserId, deleteCartByUserId } from "../../api/cartService";
function CartView() {
  const [books, setBooks] = useState([]);
  const { id_usuario } = useContext(AuthContext);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/carrito/${id_usuario}`);
        const libros = response.data.libros.map((item) => ({
          id: item.id_libro,
          title: item.nombre,
          author: item.autor || "Autor desconocido",
          coverUrl: item.imagen_url || "/placeholder.svg",
          price: item.precio,
          quantity: item.cantidad,
        }));
        setBooks(libros);
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    if (id_usuario) {
      fetchCart();
    }
  }, [id_usuario]);

  const subtotal = books.reduce((acc, book) => acc + (book.price * book.quantity), 0);
  const impuestos = 1500;
  const servicio = 2500;
  const total = subtotal + impuestos + servicio;

  const handleRemove = async (id_libro) => {
    try {
      await axiosInstance.delete(`/carrito/${id_usuario}/items/${id_libro}`);
      setBooks((prev) => prev.filter((book) => book.id !== id_libro));
    } catch (error) {
      console.error("Error al eliminar el libro del carrito:", error);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const updated = books.map(book =>
      book.id === id ? { ...book, quantity: Number(newQuantity) } : book
    );
    setBooks(updated);
    await axiosInstance.post(`/carrito/${id_usuario}`, {
      id_libro: id,
      cantidad: newQuantity,
    });
  };

  return (
    <div className="cart-container">
      {books.length === 0 ? (
        <div className="empty-cart-container">
          <img
            src="/images/empty-cart.png"
            alt="Carrito vacío"
            className="empty-cart-image"
          />
          <h2>Tu carrito está vacío</h2>
          <p>¡Parece que aún no has agregado libros!</p>
          <Link to="/" className="back-to-store-link">
            <button className="back-to-store-button">Explorar libros</button>
          </Link>
        </div>

      ) : (
        <>
          <h1 className="cart-title">Tu carrito</h1>
          <div className="cart-items">
            {books.map((book) => (
              <div key={book.id} className="cart-item">
                <img src={book.coverUrl} alt={book.title} className="cart-item-image" />

                <div className="cart-item-info">
                  <h2 className="cart-item-title">{book.title}</h2>
                  <p className="cart-item-author">{book.author}</p>
                </div>

                <div className="cart-item-column">
                  <p className="cart-item-label">Cantidad</p>
                  <select
                    value={book.quantity}
                    onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div className="cart-item-column">
                  <p className="cart-item-label">Precio</p>
                  <div className="cart-item-price">₡{book.price.toLocaleString('es-CR')}</div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(book.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Impuestos</span>
              <span className="cart-summary-value">₡{impuestos.toLocaleString('es-CR')}</span>
            </div>
            <div className="summary-row">
              <span>Cargo de servicio</span>
              <span className="cart-summary-value">₡{servicio.toLocaleString('es-CR')}</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₡{total.toLocaleString('es-CR')}</span>
            </div>
          </div>

          <Link to="/pages/checkout" className="checkout-link">
            <button className="checkout-button">Realizar Pedido</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartView;
