import { connection } from "../dataBaseConfig.js";

export async function getBooksByCategoryModel(categoriaId) {
  try {
    const [rows] = await connection.execute(
      `SELECT 
         id_libro AS id,
         nombre AS title,
         autor AS author,
         descripcion,
         precio,
         existencias AS stock,
         imagen_url AS image
       FROM libros
       WHERE id_categoría = ?`,
      [categoriaId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getBooksByCategoryModel:", error.message);
    throw error;
  }
}

export async function getBookByIdModel(id) {
  const [rows] = await connection.execute(
    `SELECT 
       id_libro AS id,
       nombre AS title,
       autor AS author,
       descripcion,
       precio,
       imagen_url AS image,
       existencias AS stock,
       id_categoría
     FROM libros
     WHERE id_libro = ?`,
    [id]
  );
  return rows[0];
}
