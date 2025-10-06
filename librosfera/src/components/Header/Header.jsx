import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";
import logo from "../../assets/black-nobg.png";

export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="librosfera-header">
      <nav className="navbar navbar-expand-lg navbar-light librosfera-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Librosfera Logo" style={{ height: "80px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books/7">Ofertas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books/8">Más vendidos</Link>
              </li>
            </ul>

            <form className="d-flex librosfera-search-bar desktop-search">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar libros..."
                aria-label="Buscar"
              />
              <button className="btn" type="submit">
                <i className="ri-search-line"></i>
              </button>
            </form>

            <ul className="navbar-nav ms-3 desktop-menu">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/UserPage" className="nav-link">Mi perfil</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">Carrito</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Acceder</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">Carrito</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Menu para celulares */}
          {menuOpen && (
            <div className="mobile-bar">
              <form className="d-flex librosfera-search-bar mobile-search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Buscar libros..."
                  aria-label="Buscar"
                />
                <button className="btn" type="submit">
                  <i className="ri-search-line"></i>
                </button>
              </form>

              <ul className="navbar-nav mobile-menu-items">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Categorías</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books/7">Ofertas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books/8">Más vendidos</Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link to="/UserPage" className="nav-link">Mi perfil</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">Carrito</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Acceder</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">Carrito</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
