import axiosInstance from "./axiosInstance";

export async function getAllCategories() {
  const response = await axiosInstance.get("/categorias");
  return response.data;
}
