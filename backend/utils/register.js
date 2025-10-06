export function validateRegister(
  name,
  lastName,
  email,
  password,
  confirmPassword
) {
  // Validar nombre y apellidos
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!name) return "El nombre es obligatorio.";
  if (!nameRegex.test(name)) return "El nombre debe contener sólo letras.";

  if (!lastName) return "Los apellidos son obligatorios.";
  if (!nameRegex.test(lastName))
    return "Los apellidos deben contener sólo letras.";

  // Validar formato de email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email) return "El correo es obligatorio.";
  if (!emailRegex.test(email)) return "El correo no es válido.";

  // Validar contraseña
  if (!password) return "La contraseña es obligatoria.";
  if (password.length < 6) return "Debe tener al menos 6 caracteres.";
  if (!/[A-Za-z]/.test(password)) return "Debe contener al menos una letra.";
  if (!/\d/.test(password)) return "Debe contener al menos un número.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Debe contener un carácter especial.";

  // Confirmar contraseña
  if (password !== confirmPassword) return "Las contraseñas no coinciden.";

  return "valid";
}
