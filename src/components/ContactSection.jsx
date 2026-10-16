import React, { useState } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

/**
 * ============================================================================
 * CONFIGURAÇÃO DO ENVIO DE FORMULÁRIO ESTÁTICO (TAREFA 6)
 * ============================================================================
 * Escolhemos o FormSubmit (https://formsubmit.co) por ser o mais simples para
 * sites estáticos: não exige biblioteca externa nem cadastro prévio.
 *
 * COMO ATIVAR:
 * 1. Ao enviar a primeira mensagem pelo formulário em produção, o FormSubmit
 *    enviará um e-mail de confirmação para "arborizacaointeligente1@gmail.com".
 * 2. Clique em "Activate Form" nesse e-mail e todos os envios seguintes chegarão
 *    diretamente na sua caixa de entrada.
 *
 * ALTERNATIVA (FORMSPREE):
 * Caso prefira usar o Formspree (https://formspree.io), basta substituir a URL
 * abaixo por: 'https://formspree.io/f/SEU_CODIGO_FORMSPREE'
 * ============================================================================
 */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/arborizacaointeligente1@gmail.com';
const CONTACT_EMAIL = 'arborizacaointeligente1@gmail.com';
const CONTACT_PHONE_DISPLAY = '(79) 99886-6584';
const CONTACT_PHONE_HREF = 'tel:+5579998866584';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection({ onShowToast }) {
  const { dict } = useLanguage();
  const contactDict = dict.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error' | ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ type: 'error', message: contactDict.errorRequired });
      if (onShowToast) onShowToast(contactDict.errorRequired);
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus({ type: 'error', message: contactDict.errorEmail });
      if (onShowToast) onShowToast(contactDict.errorEmail);
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _subject: `[Site Arborização Inteligente] Contato de ${trimmedName}`,
          _template: 'table'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: contactDict.successMsg });
      if (onShowToast) onShowToast(contactDict.successMsg, 4500);
    } catch {
      setStatus({ type: 'error', message: contactDict.errorSend });
      if (onShowToast) onShowToast(contactDict.errorSend, 4500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contato">
      <div className="container">
        <div className="section-header text-center">
          <p className="eyebrow eyebrow-dark" data-i18n="contact.eyebrow">
            {contactDict.eyebrow}
          </p>
          <h2 data-i18n="contact.title">{contactDict.title}</h2>
          <p className="section-text" data-i18n="contact.subtitle">
            {contactDict.subtitle}
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Coluna Esquerda: Apenas E-mail e Telefone (Tarefa 6) */}
          <div className="contact-direct-cards">
            {/* Card 1: E-mail Oficial */}
            <div className="contact-channel-card">
              <div className="contact-channel-icon email" aria-hidden="true">
                <Icon name="envelope-simple" size="lg" />
              </div>
              <div className="contact-channel-content">
                <span className="contact-channel-label" data-i18n="contact.emailCardLabel">
                  {contactDict.emailCardLabel}
                </span>
                <h3 data-i18n="contact.emailCardTitle">{contactDict.emailCardTitle}</h3>
                <p data-i18n="contact.emailCardDesc">{contactDict.emailCardDesc}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="btn btn-primary contact-channel-btn ic-interactive"
                >
                  <span data-i18n="contact.emailCardBtn">{contactDict.emailCardBtn}</span>
                  <Icon name="paper-plane-tilt-duotone" size="sm" />
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-channel-info">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Card 2: Telefone Oficial (79) 99886-6584 */}
            <div className="contact-channel-card">
              <div className="contact-channel-icon phone" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-channel-content">
                <span className="contact-channel-label" data-i18n="contact.phoneCardLabel">
                  {contactDict.phoneCardLabel}
                </span>
                <h3 data-i18n="contact.phoneCardTitle">{contactDict.phoneCardTitle}</h3>
                <p data-i18n="contact.phoneCardDesc">{contactDict.phoneCardDesc}</p>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="btn btn-primary contact-channel-btn ic-interactive"
                >
                  <span data-i18n="contact.phoneCardBtn">{contactDict.phoneCardBtn}</span>
                </a>
                <a href={CONTACT_PHONE_HREF} className="contact-channel-info contact-phone-number">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato (Nome, E-mail, Mensagem) */}
          <div className="contact-form-container">
            <div className="contact-form-header">
              <span className="contact-form-badge" data-i18n="contact.formBadge">
                {contactDict.formBadge}
              </span>
              <h3 data-i18n="contact.formTitle">{contactDict.formTitle}</h3>
              <p data-i18n="contact.formDesc">{contactDict.formDesc}</p>
            </div>

            <form
              id="contactForm"
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-group">
                <label htmlFor="formName" className="form-label" data-i18n="contact.nameLabel">
                  {contactDict.nameLabel} *
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="formName"
                    name="name"
                    className="form-input"
                    placeholder={contactDict.namePlaceholder}
                    data-i18n-placeholder="contact.namePlaceholder"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formEmail" className="form-label" data-i18n="contact.emailLabel">
                  {contactDict.emailLabel} *
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="formEmail"
                    name="email"
                    className="form-input"
                    placeholder={contactDict.emailPlaceholder}
                    data-i18n-placeholder="contact.emailPlaceholder"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="formMessage"
                  className="form-label"
                  data-i18n="contact.messageLabel"
                >
                  {contactDict.messageLabel} *
                </label>
                <div className="input-wrapper">
                  <textarea
                    id="formMessage"
                    name="message"
                    className="form-input form-textarea"
                    rows="4"
                    placeholder={contactDict.messagePlaceholder}
                    data-i18n-placeholder="contact.messagePlaceholder"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {status.message && (
                <div
                  className={`contact-form-feedback ${status.type === 'success' ? 'is-success' : 'is-error'}`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                id="contactSubmitBtn"
                className={`contact-submit-btn ${isSubmitting ? 'is-loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="btn-spinner"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                    <span data-i18n="contact.sendingBtn">{contactDict.sendingBtn}</span>
                  </>
                ) : (
                  <>
                    <span data-i18n="contact.submitBtn">{contactDict.submitBtn}</span>
                    <Icon name="paper-plane-tilt-duotone" size="sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
