import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { postRegister } from "../../api/authentication";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    offers: false,
  });

  const [registerError, setRegisterError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "nombre":
      case "apellidos":
        if (!value) {
          error = "Este campo es obligatorio";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
          error = "Debe contener sólo letras";
        }
        break;

      case "email":
        if (!value) {
          error = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "El correo no es válido";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (value.length < 6) {
          error = "Debe tener al menos 6 caracteres";
        } else if (!/[A-Za-z]/.test(value)) {
          error = "Debe contener al menos una letra";
        } else if (!/\d/.test(value)) {
          error = "Debe contener al menos un número";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "Debe contener un carácter especial";
        }
        break;

      case "confirmPassword":
        if (value !== form.password) {
          error = "Las contraseñas no coinciden";
        }
        break;

      case "terms":
        if (!value) {
          error = "Debe aceptar los términos y condiciones";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  const isFormValid = () => {
    return (
      form.nombre &&
      form.apellidos &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.terms &&
      Object.values(errors).every((e) => !e)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.entries(form).forEach(([field, value]) =>
      validateField(field, value)
    );

    if (isFormValid()) {
      setRegisterError(null);
      try {
        await postRegister(
          form.nombre,
          form.apellidos,
          form.email,
          form.password,
          form.confirmPassword
        );

        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data) {
          setRegisterError(error.response.data.message);
        } else {
          setRegisterError("Ocurrió un error inesperado. Intenta más tarde.");
        }
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Crear Cuenta</h1>
        <p className="subtitle">
          Regístrate para acceder a nuestro catálogo completo
        </p>

        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="field-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <p className="error">{errors.nombre}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                value={form.apellidos}
                onChange={handleChange}
              />
              {errors.apellidos && <p className="error">{errors.apellidos}</p>}
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <p className="password-hint">
              La contraseña debe tener al menos 6 caracteres, un número y un
              carácter especial
            </p>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              Acepto los <a href="#">términos y condiciones</a> y la{" "}
              <a href="#">política de privacidad</a>
            </label>
          </div>
          {errors.terms && <p className="error">{errors.terms}</p>}
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="offers"
              name="offers"
              checked={form.offers}
              onChange={handleChange}
            />
            <label htmlFor="offers">
              Quiero recibir novedades y ofertas por email
            </label>
          </div>

          <button type="submit" disabled={!isFormValid()}>
            Crear Cuenta
          </button>
          {registerError && <p className="error">{registerError}</p>}
        </form>

        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
