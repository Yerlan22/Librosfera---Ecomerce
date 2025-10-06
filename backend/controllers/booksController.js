import { getBooksByCategoryModel } from "../models/booksModel.js";
import { getBookByIdModel } from "../models/booksModel.js";

export async function getBooksByCategoryController(req, res) {
  const { id } = req.params;

  try {
    const books = await getBooksByCategoryModel(id);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error al obtener libros por categoría:", error.message);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "No se pudieron obtener los libros.",
    });
  }
}

export async function getBookByIdController(req, res) {
  const { id } = req.params;

  try {
    const book = await getBookByIdModel(id);
    if (!book) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Libro no encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error al obtener libro:", error.message);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
}