import { connection } from "../dataBaseConfig.js";

export async function getUserOrdersModel(idUsuario) {
  const [rows] = await connection.execute(
    `SELECT 
      c.id_compra,
      c.fecha,
      c.total,
      l.nombre AS titulo,
      l.autor,
      l.imagen_url AS image,
      dc.cantidad,
      dc.precio_unitario
    FROM compras c
    JOIN detalle_compras dc ON c.id_compra = dc.id_compra
    JOIN libros l ON dc.id_libro = l.id_libro
    WHERE c.id_usuario = ?
    ORDER BY c.fecha DESC`,
    [idUsuario]
  );
  return rows;
}
