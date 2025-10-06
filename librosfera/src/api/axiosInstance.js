// Librería Axios, que permite realizar peticiones HTTP
import axios from "axios";

// Instancia personalizada de Axios con una configuración base
const axiosInstance = axios.create({
   // URL base para todas las solicitudes HTTP
  baseURL: "http://localhost:3000/api",
  // Encabezados que se enviarán con cada solicitud
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
