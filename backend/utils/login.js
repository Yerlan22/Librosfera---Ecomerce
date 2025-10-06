// Validar email y contraseña
export function validateEmailPassword(email, password) {
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "El correo es obligatorio.";
  if (!emailRegex.test(email)) return "El correo no es válido.";

  // Validar contraseña
  if (!password) return "La contraseña es obligatoria.";
  if (password.length < 6) return "Debe tener al menos 6 caracteres.";
  if (!/[A-Za-z]/.test(password)) return "Debe contener al menos una letra.";
  if (!/\d/.test(password)) return "Debe contener al menos un número.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Debe contener al menos un carácter especial.";

  return "valid";
}
