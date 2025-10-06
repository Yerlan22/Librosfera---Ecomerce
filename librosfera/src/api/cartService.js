import axiosInstance from "./axiosInstance";

// Obtener los libros del carrito de un usuario
export async function getCartByUserId(id_usuario) {
    
  const response = await axiosInstance.get(`/carrito/${id_usuario}`);
  return response.data;
}

export async function deleteCartByUserId(id_usuario) {
  const response = await axiosInstance.delete(`/carrito/${id_usuario}`);
  return response.data;
}