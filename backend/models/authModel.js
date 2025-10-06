import { connection } from "../dataBaseConfig.js";

export async function getUser(email) {
  try {
    const [rows] = await connection.execute(
      "SELECT id_usuario, nombre, email, contraseña FROM usuarios WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error("Error en getUser:", error.message);
    throw error;
  }
}

export async function verifyEmail(email) {
  try {
    const [rows] = await connection.execute(
      "SELECT 1 FROM usuarios WHERE email = ?",
      [email]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error en verifyEmail:", error.message);
    throw error;
  }
}

export async function saveUser(newUser) {
  try {
    const { nombre, email, contraseña } = newUser;

    const [result] = await connection.execute(
      "INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)",
      [nombre, email, contraseña]
    );

    const userId = result.insertId;

    // Crear el carrito asociado
    await connection.execute(
      "INSERT INTO carritos (id_usuario) VALUES (?)",
      [userId]
    );

    console.log("Usuario y carrito guardados exitosamente.");
  } catch (error) {
    console.error("Error al guardar el usuario y su carrito:", error.message);
    throw error;
  }
}
