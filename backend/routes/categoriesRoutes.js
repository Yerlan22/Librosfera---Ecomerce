import express from "express";
import { getCategoriesController } from "../controllers/categoriesController.js";

const router = express.Router();

// Se ejecuta cuando se hace un post a /categorias
router.get("/categorias", getCategoriesController);

export default router;
