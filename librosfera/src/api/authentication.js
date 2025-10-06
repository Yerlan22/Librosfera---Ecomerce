// Funciones que realizan la solicitud al endpoint del backend
import axiosInstance from "./axiosInstance";

// Función que realiza el login
export async function postLogin(email, password) {
  // Solicitud POST al endpoint del backend
  const response = await axiosInstance.post("/login", {
    email: email,
    password: password,
  });

  // Se retornan los datos devueltos por el backend
  return response.data;
}

// Función que realiza el login
export async function postRegister(
  name,
  lastName,
  email,
  password,
  confirmPassword
) {
  // Solicitud POST al endpoint del backend
  const response = await axiosInstance.post("/register", {
    name: name,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });

  // Se retornan los datos devueltos por el backend
  return response.data;
}
