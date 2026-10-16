import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PartnersSection() {
  const { dict } = useLanguage();
  const partnersDict = dict.partners;
  const [failedLogos, setFailedLogos] = useState({});

  const handleImageError = (id) => {
    setFailedLogos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      className="partners-section"
      id="parceiros"
      aria-label={partnersDict.ariaLabel}
      data-i18n-aria-label="partners.ariaLabel"
    >
      <div className="container partners-header">
        <span className="partners-eyebrow" data-i18n="partners.eyebrow">
          {partnersDict.eyebrow}
        </span>
        <h2 className="partners-title" data-i18n="partners.title">
          {partnersDict.title}
        </h2>
      </div>

      <div className="container partners-static-list">
        {partnersDict.items.map((partner) => {
          const showFallback = Boolean(failedLogos[partner.id]);

          return (
            <div key={partner.id} className="partner-static-item">
              {!showFallback ? (
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="partner-logo-img"
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(partner.id)}
                />
              ) : (
                <div className="partner-text-fallback">
                  <div className="partner-fallback-copy">
                    <strong className="partner-fallback-name">{partner.name}</strong>
                    {partner.subtitle && (
                      <small className="partner-fallback-sub">{partner.subtitle}</small>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
