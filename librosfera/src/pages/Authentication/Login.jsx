import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { postLogin } from "../../api/authentication";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";

    if (field === "email") {
      if (!value) {
        error = "El correo es obligatorio";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "El correo no es válido";
      }
    }

    if (field === "password") {
      if (!value) {
        error = "La contraseña es obligatoria";
      } else if (value.length < 6) {
        error = "Debe tener al menos 6 caracteres";
      } else if (!/[A-Za-z]/.test(value)) {
        error = "Debe contener al menos una letra";
      } else if (!/\d/.test(value)) {
        error = "Debe contener al menos un número";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error = "Debe contener al menos un carácter especial";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      validateField("email", value);
    }

    if (name === "password") {
      setPassword(value);
      validateField("password", value);
    }
  };

  const isFormValid = () => {
    return email && password && !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField("email", email);
    validateField("password", password);

    if (isFormValid()) {
      setLoginError(null);
      try {
        const response = await postLogin(email, password);

        console.log("Datos de respuesta:", response);
        login({
          token: response.token,
          id_usuario: response.id_usuario,
          nombre: response.name
        });
        navigate("/");
      } catch (error) {
        if (error.response && error.response.data) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError("Ocurrió un error inesperado. Intenta más tarde.");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar Sesión</h1>
        <p className="login-subtitle">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" disabled={!isFormValid()}>
            Iniciar Sesión
          </button>
          {loginError && <p className="error">{loginError}</p>}
        </form>

        <p className="login-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
