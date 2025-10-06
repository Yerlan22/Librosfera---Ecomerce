import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmailPassword } from "../utils/login.js";
import { validateRegister } from "../utils/register.js";
import { getUser } from "../models/authModel.js";
import { verifyEmail } from "../models/authModel.js";
import { saveUser } from "../models/authModel.js";
import dotenv from "dotenv";

dotenv.config();

export async function postLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validar el formato email y contraseña
    const dataFormat = validateEmailPassword(email, password);
    if (dataFormat !== "valid") {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Datos con formato inválido",
        details: dataFormat,
      });
    }

    // Obtener el usuario asociado al email
    const user = await getUser(email);
    if (user == undefined) {
      return res.status(401).json({
        error: "AUTH_ERROR",
        message: "Correo o contraseña incorrectos",
      });
    }

    // Comparar el hash con la contraseña
    const isValidPassword = await bcrypt.compare(password, user.contraseña);
    if (!isValidPassword) {
      return res.status(401).json({
        error: "AUTH_ERROR",
        message: "Correo o contraseña incorrectos",
      });
    }

    // Generar el JWT que expira en 90 min
    const token = jwt.sign(
      {
        name: user.nombre,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90min" }
    );

    // Responder con el JWT y la información asociada
    return res.status(200).json({
      token,
      message: "Inicio de sesión exitoso",
      id_usuario: user.id_usuario,
      name: user.nombre,
      email: user.email,
    });
  } catch (error) {
    console.error("Error en login:", error.message);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Error interno del servidor. Intenta más tarde.",
    });
  }
}

export async function postRegister(req, res) {
  try {
    const { name, lastName, email, password, confirmPassword } = req.body;

    // Validar el formato de los datos de registro
    const dataFormat = validateRegister(
      name,
      lastName,
      email,
      password,
      confirmPassword
    );

    if (dataFormat !== "valid") {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Datos con formato inválido",
        details: dataFormat,
      });
    }

    // Verificar si el correo está asociado a una cuenta
    const emailExist = await verifyEmail(email);
    if (emailExist) {
      return res.status(409).json({
        error: "EMAIL_EXISTS",
        message: "El correo ya está registrado",
      });
    }

    // Se encripta la contraseña
    const hashPassword = await bcrypt.hash(password, 10);

    // Se crea el usuario
    const newUser = {
      nombre: `${name} ${lastName}`,
      email,
      contraseña: hashPassword,
    };

    // Se guarda el usuario en el .json
    await saveUser(newUser);

    return res.status(201).json({
      message: "Registro exitoso",
    });
  } catch (error) {
    console.error("Error en postRegister:", error.message);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Ocurrió un error en el servidor. Intente más tarde.",
      details: error.message,
    });
  }
}
