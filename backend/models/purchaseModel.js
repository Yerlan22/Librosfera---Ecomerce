import { connection } from "../dataBaseConfig.js";

export async function findUserByEmail(email) {
  const [rows] = await connection.execute(
    "SELECT id_usuario FROM usuarios WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    return rows[0].id_usuario;
  }

  return null;
}

export async function createPurchase(userId, total) {
  const [result] = await connection.execute(
    `INSERT INTO compras (id_usuario, total)
     VALUES (?, ?)`,
    [userId, total]
  );

  return result.insertId;
}

export async function createPurchaseDetails(purchaseId, books) {
  const query = `
    INSERT INTO detalle_compras (id_compra, id_libro, cantidad, precio_unitario)
    VALUES (?, ?, ?, ?)
  `;

  for (const book of books) {
    await connection.execute(query, [
      purchaseId,
      book.id,
      book.quantity,
      book.price,
    ]);
  }
}
