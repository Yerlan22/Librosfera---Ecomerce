import React, { useState, useEffect } from "react";

import "./ContactUs.css";

function ContactUs() {
  // Se utiliza useEffect para que, al montar el componente, se realice un scroll al inicio de la página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Almacena los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});

  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: "",
  });

  // Maneja los cambios en los campos del formulario
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Se limpia error
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const newErrors = {};

    // Se valida que el campo nombre no esté vacío.
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    // Se valida que el campo email no esté vacío y tenga un formato correcto
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    // Se valida que el campo mensaje no esté vacío.
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio";
    }

    // Se actualiza el estado de errors
    setErrors(newErrors);

    // Se retorna true si no hay errores, o false en caso contrario
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus({
      submitting: false,
      submitted: true,
      success: true,
      message:
        "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
    });

    // Se limpia el formulario después del envío
    setFormData({
      nombre: "",
      apellidos: "",
      telefono: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  }

  return (
    <main className="contact-form-container">
      <h2>Contáctenos</h2>

      {submitStatus.submitted && (
        <div
          className={`form-message ${
            submitStatus.success ? "success" : "error"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? "error" : ""}
            />
            {errors.nombre && (
              <span className="error-text">{errors.nombre}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="asunto">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Tu mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="6"
            className={errors.mensaje ? "error" : ""}
          />
          {errors.mensaje && (
            <span className="error-text">{errors.mensaje}</span>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={submitStatus.submitting}
        >
          {submitStatus.submitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </main>
  );
}

export default ContactUs;
