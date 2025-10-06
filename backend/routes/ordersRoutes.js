import express from "express";
const router = express.Router();
import { getUserOrdersController } from "../controllers/ordersController.js";

router.get("/compras/:id", getUserOrdersController);

export default router;
