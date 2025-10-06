import { getUserOrdersModel } from "../models/ordersModel.js";

export async function getUserOrdersController(req, res) {
  const { id } = req.params;
  try {
    const orders = await getUserOrdersModel(id);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener compras:", error.message);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
}
