import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import "./style.css";

export default function Footer() {
  return (
    <footer>
    <div className="footer-content">
      
      {/* Informações da escola */}
      <section className="school-info">
        <h3>Escola SENAI Roberto Mange</h3>
        <p>Formando profissionais para o futuro.</p>
        <address>
          <p><strong>Endereço:</strong> Rua Pastor Cícero Canuto de Lima, 71 - Campinas, SP</p>
          <p><strong>Contato:</strong> (19) 3772-1840 | <a href="mailto:contato@senai.com.br">contato@senai.com.br</a></p>
        </address>
      </section>

      {/* Redes sociais */}
      <section className="social-media">
        <h4>Redes Sociais</h4>
        <nav className="social-icons">
          <a href="https://facebook.com/senairobertomange" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} color="white" />
          </a>
          <a href="https://instagram.com/senairobertomange" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} color="white" />
          </a>
          <a href="https://linkedin.com/senairobertomange" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} color="white" />
          </a>
        </nav>
      </section>
      
    </div>

    {/* Direitos autorais */}
    <div className="footer-bottom">
      <p>&copy; 2025 SENAI Roberto Mange. Todos os direitos reservados.</p>
    </div>
  </footer>
);
}
