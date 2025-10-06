import { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orders";
import OrderCard from "./OrderCard";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const { id_usuario } = useContext(AuthContext);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const rawOrders = await getUserOrders(id_usuario);

        const grouped = rawOrders.reduce((acc, item) => {
          const orderId = item.id_compra;
          if (!acc[orderId]) {
            acc[orderId] = {
              orderNumber: orderId,
              date: item.fecha.split("T")[0],
              total: item.total,
              products: [],
            };
          }

          acc[orderId].products.push({
            title: item.titulo,
            quantity: item.cantidad,
            price: item.precio_unitario,
            image: item.image || "/book-cover.png",
          });

          return acc;
        }, {});

        setOrders(Object.values(grouped));
        setHasFetched(true);
      } catch (error) {
        console.error("Error al cargar historial de pedidos:", error.message);
      }
    }

    fetchOrders();
  }, [hasFetched]);

  return (
    <div style={{ padding: "20px" }}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard
            key={order.orderNumber}
            orderNumber={order.orderNumber}
            date={order.date}
            products={order.products}
            total={order.total}
          />
        ))
      ) : (
        <p>No se encontraron pedidos registrados.</p>
      )}
    </div>
  );
};

export default Order;
