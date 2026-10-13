import React from 'react';
import { Icon } from './IconSprite';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <img className="brand-logo" src="assets/logo.png" alt="Logo Arborização Inteligente" />
            <span className="brand-text">
              <strong>Arborização Inteligente</strong>
              <small>Tecnologia e dados para cidades sustentáveis</small>
            </span>
          </a>
          <p className="footer-tagline">
            "Uma cidade inteligente é aquela que usa tecnologia para preservar a vida."
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#arborizacao">Arborização Urbana</a></li>
            <li><a href="#solucao">Nossa Solução & Planos</a></li>
            <li><a href="#quem-somos">Quem Somos & Metas</a></li>
            <li><a href="#eventos">Destaques do Projeto</a></li>
            <li><a href="#noticias">Blog do Projeto</a></li>
            <li><a href="#contato">Fale Conosco</a></li>
          </ul>
        </div>

        <div className="footer-contact-group">
          <h4>Contato Oficial</h4>
          <ul>
            <li>
              <Icon name="envelope-simple-duotone" size="sm" />
              <a href="mailto:arborizacaointeligente1@gmail.com">arborizacaointeligente1@gmail.com</a>
            </li>
            <li>
              <Icon name="instagram-logo-duotone" size="sm" />
              <a
                href="https://www.instagram.com/arborizacao_inteligente?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                @arborizacao_inteligente
              </a>
            </li>
            <li>
              <Icon name="map-pin-area-duotone" size="sm" />
              <span>Aracaju, Sergipe - Brasil</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copy-text">
          &copy; 2026 Arborização Inteligente. Todos os direitos reservados.
        </p>
        <div className="footer-bottom-badges">
          <a
            href="https://brasil.un.org/pt-br/sdgs/11"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            title="Conheça o ODS 11 da ONU"
          >
            ODS 11 - Cidades Sustentáveis
          </a>
          <a
            href="https://brasil.un.org/pt-br/sdgs/13"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            title="Conheça o ODS 13 da ONU"
          >
            ODS 13 - Ação Climática
          </a>
          <a
            href="https://brasil.un.org/pt-br/sdgs/15"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            title="Conheça o ODS 15 da ONU"
          >
            ODS 15 - Vida Terrestre
          </a>
        </div>
      </div>
    </footer>
  );
}

