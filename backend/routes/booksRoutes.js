import express from "express";
import { getBooksByCategoryController } from "../controllers/booksController.js";
import { getBookByIdController } from "../controllers/booksController.js";

const router = express.Router();

// Se ejecuta cuando se hace un post a /libros
router.get("/libros/categoria/:id", getBooksByCategoryController);
router.get("/libros/:id", getBookByIdController);

export default router;
