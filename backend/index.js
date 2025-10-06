import express from "express";
import cors from "cors";
import routerAuth from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import booksRoutes from "./routes/booksRoutes.js"
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js"
import ordersRoutes from "./routes/ordersRoutes.js"

// Si la variable de entorno `PORT` no está definida, usar el 3000
const PORT = process.env.PORT ?? 3000;

async function runApp() {
  // Crear la instancia del servidor
  const app = express();
  // Se habilita CORS para permitir solicitudes desde dominios diferentes
  app.use(cors());

  // MIDDLEWARE
  app.use(express.json());

  app.use("/api", routerAuth);
  app.use("/api", categoriesRoutes);
  app.use("/api", booksRoutes);
  app.use('/api', cartRoutes);
  app.use("/api", paymentRoutes);
  app.use("/api", ordersRoutes);

  // Evitar que Express comparta en HTTP el framework que se está utilizando
  app.disable("x-powered-by");

  // Activar el servidor
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
}

runApp();
