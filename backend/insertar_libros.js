import mysql from "mysql2/promise";
import fetch from "node-fetch";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin1234",
  database: "librosfera",
});

const [categorias] = await connection.execute(
  "SELECT id_categoría, query_api FROM categorias_libros"
);

function getConsistentPriceFromTitle(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const normalized = Math.abs(hash % 10000) / 10000;
  const min = 5000;
  const max = 30000;
  let price = Math.floor(normalized * (max - min) + min);
  return Math.round(price / 10) * 10;
}

for (const categoria of categorias) {
  const { id_categoría, query_api } = categoria;

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query_api}&limit=30`
    );
    const data = await res.json();

    const books = data.docs
      .filter((book) => book.cover_i && book.title && book.key)
      .slice(0, 10);

    for (const book of books) {
      const workId = book.key.split("/").pop();
      const title = book.title.slice(0, 100);
      const author = book.author_name
        ? book.author_name[0].slice(0, 100)
        : "Autor desconocido";
      const price = getConsistentPriceFromTitle(title);
      const stock = 50;
      const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

      // Obtener descripción del libro
      let description = "Sin descripción disponible.";
      try {
        const workRes = await fetch(
          `https://openlibrary.org/works/${workId}.json`
        );
        const workData = await workRes.json();

        if (typeof workData.description === "string") {
          description = workData.description;
        } else if (
          typeof workData.description === "object" &&
          workData.description?.value
        ) {
          description = workData.description.value;
        }
      } catch {
        console.warn(`Descripción no encontrada para: ${title}`);
      }

      try {
        await connection.execute(
          `INSERT INTO libros (nombre, autor, descripcion, precio, existencias, imagen_url, id_categoría)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [title, author, description, price, stock, coverUrl, id_categoría]
        );
        console.log(`Insertado: ${title}`);
      } catch (err) {
        console.error(`Error insertando ${title}:`, err.message);
      }
    }

    console.log(`Completado para categoría "${query_api}"`);
  } catch (error) {
    console.error(`Fallo en categoría ${query_api}:`, error.message);
  }
}

await connection.end();
console.log("Todos los libros fueron insertados.");
