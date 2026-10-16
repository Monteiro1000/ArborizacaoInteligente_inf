import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, dict, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBrandName, setShowBrandName] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const brandRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langTriggerRef = useRef(null);
  const langOptionRefs = useRef([]);
  const mobileLangOptionRefs = useRef([]);

  const currentLanguage =
    supportedLanguages.find((item) => item.code === lang) || supportedLanguages[0];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
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
        if (isLangOpen) {
          setIsLangOpen(false);
          langTriggerRef.current?.focus();
        }
        if (isOpen) setIsOpen(false);
        if (showBrandName) setShowBrandName(false);
      }
    };

    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(e.target)) {
        setShowBrandName(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen, isOpen, showBrandName]);

  const closeMenu = () => setIsOpen(false);

  const handleBrandClick = (e) => {
    e.preventDefault();
    setShowBrandName((prev) => !prev);
  };

  const focusOptionAtIndex = (index) => {
    window.requestAnimationFrame(() => {
      langOptionRefs.current[index]?.focus();
    });
  };

  const handleLangTriggerKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const activeIdx = Math.max(
        0,
        supportedLanguages.findIndex((item) => item.code === lang)
      );
      setIsLangOpen(true);
      focusOptionAtIndex(isLangOpen ? 0 : activeIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const lastIdx = supportedLanguages.length - 1;
      setIsLangOpen(true);
      focusOptionAtIndex(lastIdx);
    }
  };

  const handleLangOptionKeyDown = (e, index) => {
    const total = supportedLanguages.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOptionAtIndex((index + 1) % total);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusOptionAtIndex((index - 1 + total) % total);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusOptionAtIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusOptionAtIndex(total - 1);
    }
  };

  const handleMobileLangKeyDown = (e, index) => {
    const total = supportedLanguages.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      mobileLangOptionRefs.current[(index + 1) % total]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      mobileLangOptionRefs.current[(index - 1 + total) % total]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      mobileLangOptionRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      mobileLangOptionRefs.current[total - 1]?.focus();
    }
  };

  const handleSelectLanguage = (code, fromMobileDrawer = false) => {
    setLang(code);
    setIsLangOpen(false);
    if (fromMobileDrawer) {
      setIsOpen(false);
    } else {
      langTriggerRef.current?.focus();
    }
  };

  const handleLangBlur = (e) => {
    if (langDropdownRef.current && !langDropdownRef.current.contains(e.relatedTarget)) {
      setIsLangOpen(false);
    }
  };

  return (
    <div className={`topbar-fixed-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <div className={`topbar ${scrolled ? 'scrolled' : ''}`} id="topbar">
        <a
          ref={brandRef}
          className={`brand ${showBrandName ? 'show-name' : ''}`}
          href="#home"
          aria-label={dict.nav.brandAria}
          data-i18n-aria-label="nav.brandAria"
          aria-expanded={showBrandName}
          onClick={handleBrandClick}
          onMouseLeave={() => setShowBrandName(false)}
        >
          <img
            className="brand-logo"
            src="assets/logo.png"
            alt={dict.nav.logoAlt}
            data-i18n-alt="nav.logoAlt"
            width="52"
            height="52"
            decoding="async"
          />
          <span className="brand-text">
            <strong data-i18n="nav.brandName">{dict.nav.brandName}</strong>
            <small data-i18n="nav.brandTagline">{dict.nav.brandTagline}</small>
          </span>
        </a>

        <div
          className={`nav-backdrop ${isOpen ? 'show' : ''}`}
          id="navBackdrop"
          aria-hidden="true"
          onClick={closeMenu}
        ></div>

        <nav
          className={`main-nav ${isOpen ? 'open' : ''}`}
          id="main-nav"
          aria-label={dict.nav.mainNavAria}
          data-i18n-aria-label="nav.mainNavAria"
        >
          <div className="nav-drawer-header">
            <div
              className={`nav-drawer-brand ${showBrandName ? 'show-name' : ''}`}
              onClick={() => setShowBrandName((prev) => !prev)}
            >
              <img
                className="nav-drawer-logo"
                src="assets/logo.png"
                alt={dict.nav.logoAlt}
                data-i18n-alt="nav.logoAlt"
              />
              <span className="nav-drawer-brand-text" data-i18n="nav.brandName">
                {dict.nav.brandName}
              </span>
            </div>
            <button
              className="nav-close-btn ic-btn"
              id="navCloseBtn"
              aria-label={dict.nav.closeMenu}
              data-i18n-aria-label="nav.closeMenu"
              onClick={closeMenu}
            >
              <Icon name="x-duotone" size="md" />
            </button>
          </div>

          <div className="nav-links-wrapper">
            <a className="nav-link" href="#arborizacao" data-i18n="nav.arborizacao" onClick={closeMenu}>
              {dict.nav.arborizacao}
            </a>
            <a className="nav-link" href="#solucao" data-i18n="nav.solucao" onClick={closeMenu}>
              {dict.nav.solucao}
            </a>
            <a className="nav-link" href="#tecnologia" data-i18n="nav.tecnologia" onClick={closeMenu}>
              {dict.nav.tecnologia}
            </a>
            <a className="nav-link" href="#parceiros" data-i18n="nav.parceiros" onClick={closeMenu}>
              {dict.nav.parceiros}
            </a>
            <a className="nav-link" href="#quem-somos" data-i18n="nav.quemSomos" onClick={closeMenu}>
              {dict.nav.quemSomos}
            </a>
            <a className="nav-link" href="#eventos" data-i18n="nav.destaques" onClick={closeMenu}>
              {dict.nav.destaques}
            </a>
            <a className="nav-link" href="#noticias" data-i18n="nav.blog" onClick={closeMenu}>
              {dict.nav.blog}
            </a>
            <a className="nav-link" href="#contato" data-i18n="nav.contato" onClick={closeMenu}>
              {dict.nav.contato}
            </a>
          </div>

          <div className="nav-drawer-footer">
            <div
              className="mobile-lang-selector"
              role="group"
              aria-label={dict.nav.langSelectorAria}
              data-i18n-aria-label="nav.langSelectorAria"
            >
              <div className="mobile-lang-header">
                <svg
                  className="lang-globe-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="mobile-lang-title" data-i18n="nav.langSelectorAria">
                  {dict.nav.langSelectorAria}
                </span>
              </div>
              <div className="mobile-lang-options">
                {supportedLanguages.map((item, idx) => {
                  const isSelected = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      ref={(el) => {
                        mobileLangOptionRefs.current[idx] = el;
                      }}
                      type="button"
                      className={`mobile-lang-btn ${isSelected ? 'active' : ''}`}
                      aria-pressed={isSelected}
                      aria-label={`${dict.nav.langSelectorAria}: ${item.fullName} (${item.label})`}
                      onClick={() => handleSelectLanguage(item.code, true)}
                      onKeyDown={(e) => handleMobileLangKeyDown(e, idx)}
                    >
                      <span className="mobile-lang-code">{item.label}</span>
                      <span className="mobile-lang-name">{item.fullName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <div className="topbar-right">
          <div
            className="lang-dropdown"
            ref={langDropdownRef}
            onBlur={handleLangBlur}
          >
            <button
              ref={langTriggerRef}
              type="button"
              className={`lang-dropdown-trigger ${isLangOpen ? 'is-open' : ''}`}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              aria-controls="lang-dropdown-listbox"
              aria-label={`${dict.nav.langSelectorAria}: ${currentLanguage.fullName} (${currentLanguage.label})`}
              onClick={() => setIsLangOpen((prev) => !prev)}
              onKeyDown={handleLangTriggerKeyDown}
            >
              <svg
                className="lang-globe-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="lang-current-code">{currentLanguage.label}</span>
              <svg
                className="lang-chevron-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isLangOpen && (
              <ul
                id="lang-dropdown-listbox"
                className="lang-dropdown-menu"
                role="listbox"
                aria-label={dict.nav.langSelectorAria}
              >
                {supportedLanguages.map((item, idx) => {
                  const isSelected = lang === item.code;
                  return (
                    <li key={item.code} role="presentation">
                      <button
                        ref={(el) => {
                          langOptionRefs.current[idx] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`lang-dropdown-option ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectLanguage(item.code)}
                        onKeyDown={(e) => handleLangOptionKeyDown(e, idx)}
                      >
                        <span className="lang-option-code">{item.label}</span>
                        <span className="lang-option-name">{item.fullName}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            className={`menu-toggle ic-btn ${isOpen ? 'open' : ''}`}
            id="menu-toggle"
            aria-label={isOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="main-nav"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon name={isOpen ? 'x-duotone' : 'list-duotone'} size="md" />
          </button>
        </div>
      </div>
    </div>
  );
}
