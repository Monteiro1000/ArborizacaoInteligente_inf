import React from 'react';
import { Icon } from './IconSprite';

export default function ContactSection() {
  return (
    <section className="contact-section" id="contato">
      <div className="container">
        <div className="section-header text-center">
          <h2>Entre em Contato Conosco</h2>
          <p className="section-text">
            Tem interesse em implementar a Arborização Inteligente na sua cidade, escola ou projeto? Fale diretamente com nossa equipe!
          </p>
        </div>

        <div className="contact-main-wrapper">
          {/* Cards dos Canais Oficiais */}
          <div className="contact-channels-grid">
            {/* Card 1: E-mail Oficial */}
            <div className="contact-channel-card">
              <div className="contact-channel-icon email">
                <Icon name="envelope-simple" size="lg" />
              </div>
              <div className="contact-channel-content">
                <span className="contact-channel-label">E-mail Oficial</span>
                <h3>Fale por E-mail</h3>
                <p>Envie propostas, solicitações de parcerias municipais, convênios acadêmicos ou tire dúvidas com nossa equipe.</p>
                <a href="mailto:arborizacaointeligente1@gmail.com" className="btn btn-primary contact-channel-btn ic-interactive">
                  <span>Enviar E-mail</span>
                  <Icon name="paper-plane-tilt-duotone" size="sm" />
                </a>
                <span className="contact-channel-info">arborizacaointeligente1@gmail.com</span>
              </div>
            </div>

            {/* Card 2: Instagram Oficial */}
            <div className="contact-channel-card">
              <div className="contact-channel-icon social-channel">
                <Icon name="instagram-logo" size="lg" />
              </div>
              <div className="contact-channel-content">
                <span className="contact-channel-label">Redes Sociais</span>
                <h3>Siga no Instagram</h3>
                <p>Acompanhe atualizações em tempo real, registros em campo, novidades tecnológicas e eventos em que participamos.</p>
                <a href="https://www.instagram.com/arborizacao_inteligente?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="btn btn-primary contact-channel-btn instagram-btn ic-interactive">
                  <span>Acessar Instagram</span>
                  <Icon name="arrow-square-out-duotone" size="sm" />
                </a>
                <span className="contact-channel-info">@arborizacao_inteligente</span>
              </div>
            </div>

            {/* Card 3: Origem & Localização */}
            <div className="contact-channel-card">
              <div className="contact-channel-icon location icone-badge">
                <Icon name="map-pin-area-duotone" size="lg" />
              </div>
              <div className="contact-channel-content">
                <span className="contact-channel-label">Base do Projeto</span>
                <h3>Localização &amp; Origem</h3>
                <p>
                  Iniciativa nascida em Sergipe, vinculada à comunidade acadêmica da{' '}
                  <a href="https://www.ufs.br/" target="_blank" rel="noopener noreferrer" className="contact-inline-link ic-interactive" title="Acessar portal da UFS">
                    <span>UFS</span>
                    <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                  </a>
                  , desenvolvida para impactar o Nordeste e o Brasil.
                </p>
                <div className="contact-location-badge">
                  <Icon name="map-pin-area-duotone" size="sm" />
                  <span>Aracaju, Sergipe - Brasil</span>
                </div>
                <a
                  href="https://www.ufs.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-info contact-channel-link ic-interactive"
                  title="Acessar portal oficial da Universidade Federal de Sergipe"
                >
                  <span>Universidade Federal de Sergipe (UFS)</span>
                  <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

