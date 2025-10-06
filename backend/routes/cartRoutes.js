import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  checkoutCart,
  deleteCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/carrito/:id_usuario', getCart);
router.post('/carrito/:id_usuario', addToCart);
router.delete('/carrito/:id_usuario/items/:id_libro', removeFromCart);
router.post('/carrito/checkout/:id_usuario', checkoutCart);
router.delete("/carrito/:idUsuario", deleteCart);
export default router;