import React from 'react';
import { TEAM_MEMBERS, TEAM_GOALS, ODS_ITEMS } from '../data/teamData';
import { Icon } from './IconSprite';

export default function TeamSection() {
  return (
    <section className="team-section" id="quem-somos">
      <div className="container">
        <div className="section-header text-center">
          <h2>Equipe, Metas e Objetivos</h2>
          <p className="section-text">
            Conheça o time de estudantes, pesquisadores e inovadores sergipanos dedicado a construir cidades sustentáveis e inteligentes.
          </p>
        </div>

        {/* Grid de Membros da Equipe */}
        <div className="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="team-card reveal"
              style={{ '--delay': member.delay }}
            >
              <div className={`member-photo-wrapper ${member.photoClass || ''}`.trim()}>
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  loading="lazy"
                />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <span className="member-role">{member.role}</span>
                <p className="member-desc">{member.desc}</p>
                <div className="member-socials">
                  {member.linkedin && member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      className="member-social-link ic-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
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
                      aria-label={`Instagram de ${member.name}`}
                      title="Instagram"
                    >
                      <Icon name="instagram-logo-duotone" size="sm" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metas, Objetivos e ODS */}
        <div className="goals-container reveal">
          <div className="goals-header">
            <h3>Metas, Objetivos e Compromisso com os ODS</h3>
            <p>Trabalhamos orientados por indicadores claros de curto, médio e longo prazo:</p>
          </div>

          <div className="goals-grid">
            {TEAM_GOALS.map((goal) => (
              <div key={goal.id} className="goal-item">
                <div className="goal-badge">{goal.badge}</div>
                <h4>{goal.title}</h4>
                <p>{goal.desc}</p>
              </div>
            ))}
          </div>

          {/* Selos ODS */}
          <div className="ods-wrapper">
            <span className="ods-label">
              Alinhamento Estratégico com os{' '}
              <a
                href="https://brasil.un.org/pt-br/sdgs"
                target="_blank"
                rel="noopener noreferrer"
                className="ods-main-link"
                title="Acessar página oficial dos ODS na ONU Brasil"
              >
                <span>Objetivos de Desenvolvimento Sustentável (ONU Brasil</span>
                <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                <span>)</span>
              </a>:
            </span>
            <div className="ods-badges-list">
              {ODS_ITEMS.map((ods) => (
                <a
                  key={ods.id}
                  href={ods.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ods-badge-card ${ods.className}`}
                  title={`Ver detalhes oficiais do ${ods.code} no portal da ONU`}
                >
                  <div className="ods-image-wrapper">
                    <img src={ods.img} alt={`${ods.code} - ${ods.title}`} className="ods-badge-img" loading="lazy" />
                  </div>
                  <span className="ods-number">
                    <span>{ods.code}</span>
                    <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                  </span>
                  <strong>{ods.title}</strong>
                  <p>{ods.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
