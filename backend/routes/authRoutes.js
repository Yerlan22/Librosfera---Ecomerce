import express from "express";
import { postLogin } from "../controllers/authController.js";
import { postRegister } from "../controllers/authController.js";

const routerAuth = express.Router();

// Se ejecuta cuando se hace un post a /login
routerAuth.post("/login", postLogin);
// Se ejecuta cuando se hace un post a /register
routerAuth.post("/register", postRegister);

export default routerAuth;
