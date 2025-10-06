import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ExampleOrder from "../../components/Order/Orders";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("general");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const token = localStorage.getItem("token");
  let userData = {};
  if (token) {
    try {
      userData = jwtDecode(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return (
    <div className="user-profile-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Mi cuenta</h2>
        <nav className="menu">
          <ul>
            <li onClick={() => setActiveSection("general")}>
              Información General
            </li>
            <li onClick={() => setActiveSection("historial")}>
              Historial de Pedidos
            </li>
            <li onClick={handleLogout}>Cerrar sesión</li>
            <li className="danger-option">Eliminar cuenta</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {activeSection === "general" && (
          <>
            <section className="personal-info">
              <div className="info-details">
                <h3>Información Personal</h3>
                <p>
                  <strong>Nombre:</strong> {userData.name || "No disponible"}
                </p>
                <p>
                  <strong>Correo electrónico:</strong>{" "}
                  {userData.email || "No disponible"}
                </p>
              </div>
            </section>

            <section className="description-section">
              <button className="edit-button">Editar perfil</button>
            </section>
          </>
        )}

        {activeSection === "historial" && (
          <section className="orders-section">
            <h3>Historial de Pedidos</h3>
            <ExampleOrder />
          </section>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
