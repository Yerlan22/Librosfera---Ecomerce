import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="librosfera-footer">
      
      <div className="librosfera-footer__container">
        
        <div className="librosfera-footer__grid">
          
          {/* Sección de ayuda con enlaces relevantes */}
          <div className="librosfera-footer__section">
            <h3>Ayuda</h3>
            <ul className="librosfera-footer__links">
              <li>
               <Link to="/contactus">Contáctenos</Link>
              </li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Seguridad y garantía</a></li>
            </ul>
          </div>

          {/* Sección acerca de la empresa o sitio */}
          <div className="librosfera-footer__section">
            <h3>Acerca de</h3>
            <ul className="librosfera-footer__links">
              <li><a href="#">Quiénes somos</a></li>
              <li><a href="#">Club Librosfera</a></li>
            </ul>
          </div>

          {/* Sección de términos y condiciones */}
          <div className="librosfera-footer__section">
            <h3>Términos y condiciones</h3>
            <ul className="librosfera-footer__links">
              <li><a href="#">Políticas de envío</a></li>
              <li><a href="#">Políticas de garantía</a></li>
              <li><a href="#">Términos y condiciones de uso</a></li>
            </ul>
          </div>

          {/* Sección de redes sociales */}
          <div className="librosfera-footer__section">
            <h3>Síganos</h3>
            <div className="librosfera-footer__social-icons">
              {/* Icono de Facebook */}
              <a href="#" className="librosfera-footer__social-icon">
                <i className="fab fa-facebook" aria-hidden="true"></i>
                <span className="sr-only">Facebook</span>
              </a>
              {/* Icono de Twitter */}
              <a href="#" className="librosfera-footer__social-icon">
                <i className="fab fa-twitter" aria-hidden="true"></i>
                <span className="sr-only">Twitter</span>
              </a>
              {/* Icono de Instagram */}
              <a href="#" className="librosfera-footer__social-icon">
                <i className="fab fa-instagram" aria-hidden="true"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
