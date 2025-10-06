import React from "react";
import ReactDOM from "react-dom/client"; // Usamos 'react-dom/client' para React 18
import { BrowserRouter } from "react-router-dom"; // Asegúrate de importar el BrowserRouter
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Crear el root con React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
