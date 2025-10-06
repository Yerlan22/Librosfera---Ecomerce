import axiosInstance from "./axiosInstance";

export async function getUserOrders(idUsuario) {
  const response = await axiosInstance.get(`/compras/${idUsuario}`);
  return response.data;
}
