import { connection } from '../dataBaseConfig.js';

export const getCart = async (req, res) => {
  const { id_usuario } = req.params;

  const [carrito] = await connection.query(
    'SELECT id_carrito FROM carritos WHERE id_usuario = ?',
    [id_usuario]
  );

  if (carrito.length === 0) {
    return res.status(200).json({ libros: [] });
  }

  const id_carrito = carrito[0].id_carrito;
  
  const [items] = await connection.query(`
    SELECT ci.id_libro, l.nombre, l.autor, l.precio, l.imagen_url, ci.cantidad
    FROM carrito_items ci
    JOIN libros l ON ci.id_libro = l.id_libro
    WHERE ci.id_carrito = ?
  `, [id_carrito]);

  res.json({ libros: items });
};

export const deleteCart = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const [carritoRows] = await connection.query(
      "SELECT id_carrito FROM carritos WHERE id_usuario = ?",
      [idUsuario]
    );

    if (carritoRows.length === 0) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const idCarrito = carritoRows[0].id_carrito;
    await connection.query("DELETE FROM carrito_items WHERE id_carrito = ?", [idCarrito]);

    res.status(200).json({ message: "Carrito limpiado correctamente" });
  } catch (error) {
    console.error("Error al eliminar carrito:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const addToCart = async (req, res) => {
  const { id_usuario } = req.params;
  const { id_libro, cantidad } = req.body;

  const [[carrito]] = await connection.query(
    'SELECT id_carrito FROM carritos WHERE id_usuario = ?',
    [id_usuario]
  );

  let id_carrito;

  if (!carrito) {
    const [result] = await connection.query(
      'INSERT INTO carritos (id_usuario) VALUES (?)',
      [id_usuario]
    );
    id_carrito = result.insertId;
  } else {
    id_carrito = carrito.id_carrito;
  }

  const [[existing]] = await connection.query(
    'SELECT * FROM carrito_items WHERE id_carrito = ? AND id_libro = ?',
    [id_carrito, id_libro]
  );

  if (existing) {
    await connection.query(
      'UPDATE carrito_items SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_libro = ?',
      [cantidad, id_carrito, id_libro]
    );
  } else {
    await connection.query(
      'INSERT INTO carrito_items (id_carrito, id_libro, cantidad) VALUES (?, ?, ?)',
      [id_carrito, id_libro, cantidad]
    );
  }

  res.status(200).json({ message: 'Libro agregado al carrito' });
};

export const removeFromCart = async (req, res) => {
  const { id_usuario, id_libro } = req.params;

  const [[carrito]] = await connection.query(
    'SELECT id_carrito FROM carritos WHERE id_usuario = ?',
    [id_usuario]
  );

  if (!carrito) return res.status(404).json({ message: 'Carrito no encontrado' });

  await connection.query(
    'DELETE FROM carrito_items WHERE id_carrito = ? AND id_libro = ?',
    [carrito.id_carrito, id_libro]
  );

  res.status(200).json({ message: 'Libro eliminado del carrito' });
};

export const checkoutCart = async (req, res) => {
  const { id_usuario } = req.params;

  const [[carrito]] = await connection.query(
    'SELECT id_carrito FROM carritos WHERE id_usuario = ?',
    [id_usuario]
  );

  if (!carrito) return res.status(404).json({ message: 'Carrito vacío' });

  const id_carrito = carrito.id_carrito;

  const [items] = await connection.query(
    'SELECT * FROM carrito_items WHERE id_carrito = ?',
    [id_carrito]
  );

  if (items.length === 0) return res.status(400).json({ message: 'Sin items' });

  let total = 0;
  for (const item of items) {
    const [[libro]] = await connection.query(
      'SELECT precio FROM libros WHERE id_libro = ?',
      [item.id_libro]
    );
    total += libro.precio * item.cantidad;
  }

  const [compra] = await connection.query(
    'INSERT INTO compras (id_usuario, total) VALUES (?, ?)',
    [id_usuario, total]
  );

  const id_compra = compra.insertId;

  for (const item of items) {
    const [[libro]] = await connection.query(
      'SELECT precio FROM libros WHERE id_libro = ?',
      [item.id_libro]
    );

    await connection.query(
      'INSERT INTO detalle_compras (id_compra, id_libro, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_compra, item.id_libro, item.cantidad, libro.precio]
    );

    await connection.query(
      'UPDATE libros SET existencias = existencias - ? WHERE id_libro = ?',
      [item.cantidad, item.id_libro]
    );
  }

  await connection.query('DELETE FROM carrito_items WHERE id_carrito = ?', [id_carrito]);

  res.status(200).json({ message: 'Compra realizada con éxito', id_compra });
};
