import React from 'react';
import { TEAM_MEMBERS, ODS_ITEMS } from '../data/teamData';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

export default function TeamSection() {
  const { dict } = useLanguage();
  const teamDict = dict.team;

  return (
    <section className="team-section" id="quem-somos">
      <div className="container">
        <div className="section-header text-center">
          <h2 data-i18n="team.title">{teamDict.title}</h2>
          <p className="section-text" data-i18n="team.subtitle">
            {teamDict.subtitle}
          </p>
        </div>

        {/* Grid de Membros da Equipe */}
        <div className="team-grid">
          {TEAM_MEMBERS.map((member) => {
            const memberTranslation = teamDict.members[member.id] || {
              role: member.role,
              desc: member.desc
            };

            return (
              <div
                key={member.id}
                className="team-card reveal"
                style={{ '--delay': member.delay }}
              >
                <div className={`member-photo-wrapper ${member.photoClass || ''}`.trim()}>
                  <img
                    src={member.photo}
                    alt={`${teamDict.photoAltPrefix} ${member.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span className="member-role">{memberTranslation.role}</span>
                  <p className="member-desc">{memberTranslation.desc}</p>
                  <div className="member-socials">
                    {member.linkedin && member.linkedin !== '#' && (
                      <a
                        href={member.linkedin}
                        className="member-social-link ic-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${teamDict.linkedinAriaPrefix} ${member.name}`}
                        title="LinkedIn"
                      >
                        <Icon name="linkedin-logo-duotone" size="sm" />
                      </a>
                    )}
                    {member.instagram && member.instagram !== '#' && (
                      <a
                        href={member.instagram}
                        className="member-social-link ic-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${teamDict.instagramAriaPrefix} ${member.name}`}
                        title="Instagram"
                      >
                        <Icon name="instagram-logo-duotone" size="sm" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compromisso com os ODS */}
        <div className="goals-container ods-container reveal">
          <div className="goals-header">
            <h3 data-i18n="team.goalsTitle">{teamDict.goalsTitle}</h3>
            <p data-i18n="team.goalsSubtitle">{teamDict.goalsSubtitle}</p>
          </div>

          {/* Selos ODS */}
          <div className="ods-wrapper">
            <span className="ods-label">
              {teamDict.odsLabelPrefix}{' '}
              <a
                href="https://brasil.un.org/pt-br/sdgs"
                target="_blank"
                rel="noopener noreferrer"
                className="ods-main-link"
                title={teamDict.odsLinkTitle}
              >
                <span>{teamDict.odsLinkText}</span>
                <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                <span>)</span>
              </a>
              :
            </span>
            <div className="ods-badges-list">
              {ODS_ITEMS.map((odsBase) => {
                const odsTrans =
                  teamDict.ods.find((o) => o.id === odsBase.id) || odsBase;
                return (
                  <a
                    key={odsBase.id}
                    href={odsBase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ods-badge-card ${odsBase.className}`}
                    title={`${teamDict.odsCardTitlePrefix} ${odsTrans.code}`}
                  >
                    <div className="ods-image-wrapper">
                      <img
                        src={odsBase.img}
                        alt={`${odsTrans.code} - ${odsTrans.title}`}
                        className="ods-badge-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="ods-number">
                      <span>{odsTrans.code}</span>
                      <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                    </span>
                    <strong>{odsTrans.title}</strong>
                    <p>{odsTrans.desc}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
