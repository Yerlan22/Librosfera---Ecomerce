import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

import { AuthContext } from "../../context/AuthContext";
import { getCartByUserId, deleteCartByUserId } from "../../api/cartService";
import { useContext } from "react";
function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorReason, setErrorReason] = useState("");
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Costa Rica",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const { id_usuario } = useContext(AuthContext);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paypalEmail: "",
    bankName: "",
    accountNumber: "",
    transferName: "",
  });

  const [paymentErrors, setPaymentErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {

      try {
        const response = await getCartByUserId(id_usuario);
        const formatearLibros = (libros) =>
          libros.map((libro) => ({
            id: libro.id_libro,
            title: libro.nombre,
            coverUrl: libro.imagen_url,
            author: libro.autor,
            price: parseFloat(libro.precio),
            quantity: libro.cantidad || 1,
          }));
        setBooks(formatearLibros(response.libros || []));
      } catch (error) {
        console.error("Error al obtener carrito del backend:", error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = books.reduce((acc, book) => acc + book.price * book.quantity, 0);
  const impuestos = 1500;
  const servicio = 2500;
  const total = subtotal + impuestos + servicio;

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "city":
      case "address":
      case "country":
        return value.trim() === "" ? "Este campo es obligatorio" : "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Correo inválido";
      case "postalCode":
        return /^\d{4,5}$/.test(value) ? "" : "Código postal inválido (4 o 5 dígitos)";
      case "phone":
        return /^\d{8}$/.test(value) ? "" : "Teléfono inválido (8 dígitos)";
      default:
        return "";
    }
  };

  const validatePaymentField = (name, value) => {
    switch (name) {
      case "cardNumber":
        return /^\d{16}$/.test(value.replace(/\s/g, "")) ? "" : "Número de tarjeta inválido (16 dígitos)";
      case "expiryDate":
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? "" : "Fecha inválida";
      case "cvv":
        return /^\d{3,4}$/.test(value) ? "" : "CVV inválido";
      case "cardName":
      case "transferName":
      case "bankName":
        return value.trim() === "" ? "Este campo es obligatorio" : "";
      case "accountNumber":
        return value.trim().length >= 8 ? "" : "Número de cuenta inválido (mínimo 8 caracteres)";
      case "paypalEmail":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Correo inválido";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    const error = validateField(id, value);
    setFormErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [id]: value }));
    const error = validatePaymentField(id, value);
    setPaymentErrors((prev) => ({ ...prev, [id]: error }));
  };

  const requiredPaymentFields = {
    card: ["cardNumber", "expiryDate", "cvv", "cardName"],
    paypal: ["paypalEmail"],
    transfer: ["bankName", "accountNumber", "transferName"],
  };

  const selectedFields = requiredPaymentFields[paymentMethod];

  const isPaymentValid =
    selectedFields.every((field) => paymentData[field]?.trim() !== "") &&
    selectedFields.every((field) => !paymentErrors[field]);

  const isFormValid =
    Object.values(formData).every((v) => v.trim() !== "") &&
    Object.values(formErrors).every((e) => !e) &&
    isPaymentValid;

  const handleCompletePurchase = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          paymentData,
          books,
          total,
          paymentMethod,
        }),
      });

      const result = await response.json();

      if (result.status === "approved") {
        try {
          if (id_usuario) {
            await deleteCartByUserId(id_usuario);
          }
        } catch (error) {
          console.error("Error al eliminar el carrito:", error);
        }

        setShowSuccess(true);
      } else {
        setErrorReason(result.reason || "Error desconocido");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error en la solicitud de pago:", error);
      setErrorReason("Error de conexión con el servidor");
      setShowError(true);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

return (
  <div className="checkout-container">
    <h1 className="checkout-title">Finalizar Compra</h1>

    <div className="checkout-grid">
      {/* Información de Envío */}
      <div className="checkout-card">
        <h2 className="checkout-section-title">Información de Envío</h2>
        <form className="checkout-form">
          {[
            { id: "firstName", label: "Nombre", placeholder: "Ej: Amanda" },
            { id: "lastName", label: "Apellido", placeholder: "Ej: Morales" },
            { id: "email", label: "Correo Electrónico", placeholder: "Ej: amanda@email.com" },
            { id: "address", label: "Dirección", placeholder: "Ej: Calle Rosa, edificio El Roble" },
            { id: "city", label: "Ciudad", placeholder: "Ej: Alajuela" },
            { id: "postalCode", label: "Código Postal", placeholder: "Ej: 10101" },
            { id: "phone", label: "Teléfono", placeholder: "Ej: 85314616" },
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <label htmlFor={id}>{label}</label>
              <input id={id} placeholder={placeholder} value={formData[id]} onChange={handleInputChange} />
              {formErrors[id] && <p className="error-text">{formErrors[id]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="country">País</label>
            <select id="country" value={formData.country} onChange={handleInputChange}>
              <option>Costa Rica</option>
              <option>Estados Unidos</option>
              <option>México</option>
              <option>España</option>
            </select>
            {formErrors.country && <p className="error-text">{formErrors.country}</p>}
          </div>
        </form>
      </div>

      {/* Método de Pago */}
      <div className="checkout-card">
        <h2 className="checkout-section-title">Método de Pago</h2>
        <form className="checkout-form">
          <div className="payment-options">
            {[
              { value: "card", label: "Tarjeta de Crédito / Débito" },
              { value: "paypal", label: "PayPal" },
              { value: "transfer", label: "Transferencia" },
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {label}
              </label>
            ))}
          </div>

          {paymentMethod === "card" && (
            <>
              {[
                { id: "cardNumber", label: "Número Tarjeta", placeholder: "Ej: 1234567890123456" },
                { id: "expiryDate", label: "Fecha Expiración", placeholder: "Ej: 05/25" },
                { id: "cvv", label: "CVV", placeholder: "Ej: 199" },
                { id: "cardName", label: "Nombre Titular", placeholder: "Ej: Amanda Morales" },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input id={id} placeholder={placeholder} value={paymentData[id]} onChange={handlePaymentChange} />
                  {paymentErrors[id] && <p className="error-text">{paymentErrors[id]}</p>}
                </div>
              ))}
            </>
          )}

          {paymentMethod === "paypal" && (
            <div>
              <label htmlFor="paypalEmail">Correo de PayPal</label>
              <input
                id="paypalEmail"
                placeholder="Ej: amanda@example.com"
                value={paymentData.paypalEmail}
                onChange={handlePaymentChange}
              />
              {paymentErrors.paypalEmail && <p className="error-text">{paymentErrors.paypalEmail}</p>}
            </div>
          )}

          {paymentMethod === "transfer" && (
            <>
              {[
                { id: "bankName", label: "Nombre Banco", placeholder: "Ej: Banco Nacional" },
                { id: "accountNumber", label: "Número Cuenta", placeholder: "Ej: CR05015202001026284066" },
                { id: "transferName", label: "Nombre Titular", placeholder: "Ej: Amanda Morales" },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input id={id} placeholder={placeholder} value={paymentData[id]} onChange={handlePaymentChange} />
                  {paymentErrors[id] && <p className="error-text">{paymentErrors[id]}</p>}
                </div>
              ))}
            </>
          )}
        </form>
      </div>

      {/* Resumen */}
      <div className="checkout-card">
        <h2 className="checkout-section-title">Resumen del Pedido</h2>
        <div className="order-summary">
          {books.map((book) => (
            <div key={book.id} className="order-item">
              <img src={book.coverUrl} alt={book.title} />
              <div className="order-details">
                <p className="order-title">{book.title}</p>
                <p className="order-price">
                  ₡{typeof book.price === "number" ? book.price.toLocaleString("es-CR") : "Precio no disponible"}
                </p>
                <p className="order-qty">Cantidad: {book.quantity}</p>
              </div>
            </div>
          ))}

          <div className="order-totals">
            <div>Subtotal: <span>₡{subtotal.toLocaleString("es-CR")}</span></div>
            <div>Envío: <span>₡{servicio.toLocaleString("es-CR")}</span></div>
            <div>Impuestos: <span>₡{impuestos.toLocaleString("es-CR")}</span></div>
            <div className="order-total">Total: <span>₡{total.toLocaleString("es-CR")}</span></div>
          </div>

          <div className="complete-purchase-section">
            <button
              type="button"
              className="checkout-button"
              onClick={handleCompletePurchase}
              disabled={!isFormValid}
            >
              Completar Pedido
            </button>
          </div>

          {showSuccess && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-icon">✔️</div>
                <h2>¡Compra realizada con éxito!</h2>
                <button className="modal-button" onClick={handleGoHome}>
                  Ir al inicio
                </button>
              </div>
            </div>
          )}

          {showError && (
            <div className="modal-overlay">
              <div className="modal-content error">
                <div className="modal-icon">❌</div>
                <h2>Compra rechazada</h2>
                <p>{errorReason}</p>
                <button className="modal-button" onClick={() => setShowError(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

          <p className="checkout-terms">
            Al completar la compra, aceptas nuestros términos y condiciones y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
export default Checkout;
