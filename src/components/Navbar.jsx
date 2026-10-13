import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './IconSprite';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBrandName, setShowBrandName] = useState(false);
  const brandRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (showBrandName) setShowBrandName(false);
      }
    };

    const handleClickOutside = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setShowBrandName(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, showBrandName]);

  const closeMenu = () => setIsOpen(false);

  const handleBrandClick = (e) => {
    e.preventDefault();
    setShowBrandName((prev) => !prev);
  };

  return (
    <div className={`topbar container ${scrolled ? 'scrolled' : ''}`} id="topbar">
      <a
        ref={brandRef}
        className={`brand ${showBrandName ? 'show-name' : ''}`}
        href="#home"
        aria-label="Arborização Inteligente"
        aria-expanded={showBrandName}
        onClick={handleBrandClick}
        onMouseLeave={() => setShowBrandName(false)}
      >
        <img className="brand-logo" src="assets/logo.png" alt="Logo Arborização Inteligente" />
        <span className="brand-text">
          <strong>Arborização Inteligente</strong>
          <small>Monitoramento arbóreo para cidades mais verdes</small>
        </span>
      </a>

      <button
        className={`menu-toggle ic-btn ${isOpen ? 'open' : ''}`}
        id="menu-toggle"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu de navegação"}
        aria-expanded={isOpen}
        aria-controls="main-nav"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name={isOpen ? 'x-duotone' : 'list-duotone'} size="md" />
      </button>

      <div
        className={`nav-backdrop ${isOpen ? 'show' : ''}`}
        id="navBackdrop"
        aria-hidden="true"
        onClick={closeMenu}
      ></div>

      <nav className={`main-nav ${isOpen ? 'open' : ''}`} id="main-nav" aria-label="Menu principal">
        <div className="nav-drawer-header">
          <div
            className={`nav-drawer-brand ${showBrandName ? 'show-name' : ''}`}
            onClick={() => setShowBrandName((prev) => !prev)}
          >
            <img className="nav-drawer-logo" src="assets/logo.png" alt="Logo Arborização Inteligente" />
            <span className="nav-drawer-brand-text">Arborização Inteligente</span>
          </div>
          <button className="nav-close-btn ic-btn" id="navCloseBtn" aria-label="Fechar menu" onClick={closeMenu}>
            <Icon name="x-duotone" size="md" />
          </button>
        </div>

        <div className="nav-links-wrapper">
          <a className="nav-link" href="#arborizacao" onClick={closeMenu}>Arborização</a>
          <a className="nav-link" href="#solucao" onClick={closeMenu}>Solução & Planos</a>
          <a className="nav-link" href="#quem-somos" onClick={closeMenu}>Quem somos</a>
          <a className="nav-link" href="#eventos" onClick={closeMenu}>Destaques</a>
          <a className="nav-link" href="#noticias" onClick={closeMenu}>Blog</a>
          <a className="nav-link" href="#contato" onClick={closeMenu}>Contato</a>
        </div>

        <div className="nav-drawer-footer">
          <a className="contact-link" href="#contato" onClick={closeMenu}>
            Falar com a equipe
          </a>
        </div>
      </nav>
    </div>
  );
}
