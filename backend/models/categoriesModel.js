import { connection } from "../dataBaseConfig.js";

export async function getCategoriesModel() {
  try {
    const [rows] = await connection.execute(
      "SELECT id_categoría AS id, nombre FROM categorias_libros"
    );
    return rows;
  } catch (error) {
    console.error("Error en getAllCategories:", error.message);
    throw error;
  }
}
