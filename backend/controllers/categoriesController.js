import { getCategoriesModel } from "../models/categoriesModel.js";

export async function getCategoriesController(req, res) {
  try {
    const categories = await getCategoriesModel();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error.message);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "No se pudieron obtener las categorías.",
    });
  }
}
