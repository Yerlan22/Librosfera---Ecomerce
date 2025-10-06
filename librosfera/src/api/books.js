// Funciones que realizan la solicitud al endpoint del backend
import axiosInstance from "./axiosInstance";

// Función para obtener libros por categoría
export async function getBooksByCategory(categoriaId) {
  const response = await axiosInstance.get(`/libros/categoria/${categoriaId}`);
  return response.data;
}

// Función para obtener un libro específico por el ID
export async function getBookById(id) {
  const response = await axiosInstance.get(`/libros/${id}`);
  return response.data;
}
