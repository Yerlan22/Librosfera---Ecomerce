import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("auth"));
    return stored || { token: null, id_usuario: null, nombre: null };
  });

  const login = ({ token, id_usuario, nombre }) => {
    const newAuth = { token, id_usuario, nombre };
    localStorage.setItem("auth", JSON.stringify(newAuth));
    setAuth(newAuth);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ token: null, id_usuario: null, nombre: null });
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auth"));
    if (stored) {
      setAuth(stored);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, isAuthenticated: !!auth.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
