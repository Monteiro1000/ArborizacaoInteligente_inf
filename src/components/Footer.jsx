import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * ============================================================================
 * LINKS SOCIAIS E CONTATO DO RODAPÉ (TAREFA 6 — EDITE AQUI)
 * ============================================================================
 */
const FOOTER_SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/arborizacao_inteligente',
  linkedin: 'https://www.linkedin.com/company/arborizacao-inteligente', // [PLACEHOLDER: Substitua pela URL oficial do LinkedIn da startup]
  email: 'mailto:arborizacaointeligente1@gmail.com',
  emailDisplay: 'arborizacaointeligente1@gmail.com',
  phoneHref: 'tel:+5579998866584',
  phoneDisplay: '(79) 99886-6584'
};

export default function Footer() {
  const { dict } = useLanguage();
  const footerDict = dict.footer;

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <img
              className="brand-logo"
              src="assets/logo.png"
              alt={dict.nav.logoAlt}
              data-i18n-alt="nav.logoAlt"
              loading="lazy"
              decoding="async"
            />
            <span className="brand-text">
              <strong data-i18n="nav.brandName">{dict.nav.brandName}</strong>
              <small data-i18n="footer.brandSubtitle">{footerDict.brandSubtitle}</small>
            </span>
          </a>
          <p className="footer-tagline" data-i18n="footer.tagline">
            {footerDict.tagline}
          </p>

          {/* Ícones sociais no Footer: Instagram, LinkedIn e E-mail (SVG com aria-label) */}
          <div className="footer-social-icons">
            <a
              href={FOOTER_SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label={footerDict.instagramAria}
              data-i18n-aria-label="footer.instagramAria"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href={FOOTER_SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label={footerDict.linkedinAria}
              data-i18n-aria-label="footer.linkedinAria"
              title="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href={FOOTER_SOCIAL_LINKS.email}
              className="footer-social-btn"
              aria-label={footerDict.emailAria}
              data-i18n-aria-label="footer.emailAria"
              title="E-mail"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 data-i18n="footer.navTitle">{footerDict.navTitle}</h4>
          <ul>
            <li>
              <a href="#arborizacao" data-i18n="footer.navArborizacao">
                {footerDict.navArborizacao}
              </a>
            </li>
            <li>
              <a href="#solucao" data-i18n="footer.navSolucao">
                {footerDict.navSolucao}
              </a>
            </li>
            <li>
              <a href="#tecnologia" data-i18n="footer.navTecnologia">
                {footerDict.navTecnologia}
              </a>
            </li>
            <li>
              <a href="#parceiros" data-i18n="footer.navParceiros">
                {footerDict.navParceiros}
              </a>
            </li>
            <li>
              <a href="#quem-somos" data-i18n="footer.navQuemSomos">
                {footerDict.navQuemSomos}
              </a>
            </li>
            <li>
              <a href="#eventos" data-i18n="footer.navDestaques">
                {footerDict.navDestaques}
              </a>
            </li>
            <li>
              <a href="#noticias" data-i18n="footer.navBlog">
                {footerDict.navBlog}
              </a>
            </li>
            <li>
              <a href="#contato" data-i18n="footer.navContato">
                {footerDict.navContato}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-contact-group">
          <h4 data-i18n="footer.contactTitle">{footerDict.contactTitle}</h4>
          <ul>
            <li>
              <svg
                className="ic-svg ic-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a href={FOOTER_SOCIAL_LINKS.email}>{FOOTER_SOCIAL_LINKS.emailDisplay}</a>
            </li>
            <li>
              <svg
                className="ic-svg ic-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href={FOOTER_SOCIAL_LINKS.phoneHref}>{FOOTER_SOCIAL_LINKS.phoneDisplay}</a>
            </li>
            <li>
              <svg
                className="ic-svg ic-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <a
                href={FOOTER_SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                @arborizacao_inteligente
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          <p className="copy-text" data-i18n="footer.copyright">
            {footerDict.copyright}
          </p>
          <p className="footer-credits-note">
            <small>
              Fotos dos cards sob licenças livres (Wikimedia Commons / CC-BY / Domínio Público).{' '}
              <a href="CREDITS.md" target="_blank" rel="noopener noreferrer" className="footer-credits-link">
                Ver Créditos
              </a>
            </small>
          </p>
        </div>
        <div className="footer-bottom-badges">
          <a
            href="https://brasil.un.org/pt-br/sdgs/11"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            data-i18n="footer.ods11"
          >
            {footerDict.ods11}
          </a>
          <a
            href="https://brasil.un.org/pt-br/sdgs/13"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            data-i18n="footer.ods13"
          >
            {footerDict.ods13}
          </a>
          <a
            href="https://brasil.un.org/pt-br/sdgs/15"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ods-link"
            data-i18n="footer.ods15"
          >
            {footerDict.ods15}
          </a>
        </div>
      </div>
    </footer>
  );
}
