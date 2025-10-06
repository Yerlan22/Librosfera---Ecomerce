import "./OrderCard.css";

const OrderCard = ({ orderNumber, date, products, total }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-number">Pedido #{orderNumber}</span>
        <span className="order-date">Fecha: {date}</span>
      </div>

      <div className="products-section">
        <h3 className="products-title">Productos:</h3>
        <div className="products-list">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img
                src={product.image || "/book-cover.png"}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <div className="product-title">Título: {product.title}</div>
                <div className="product-quantity">
                  Cantidad: {product.quantity}
                </div>
                <div className="product-price">
                  Precio: ₡{product.price.toLocaleString("es-CR")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-total">
        <strong>Total: ₡{total.toLocaleString("es-CR")}</strong>
      </div>
    </div>
  );
};

export default OrderCard;
