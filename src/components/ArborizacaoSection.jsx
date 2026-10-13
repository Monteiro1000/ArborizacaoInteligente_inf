import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ARBOR_CARDS } from '../data/arborData';

/**
 * Seção Arborização - Dinâmica Interativa de Cartas de Baralho
 * Máquina de estados:
 * - 'stacked' (Estado 1): Baralho empilhado com carta-convite no topo
 * - 'fanned'  (Estado 2): Carta-convite sai e as 3 cartas abrem em leque (desktop) / pilha (mobile)
 * - 'reading' (Estado 3): Uma carta vira em Flip 3D e exibe o conteúdo completo; apenas 1 aberta por vez
 */
export default function ArborizacaoSection() {
  const [deckState, setDeckState] = useState('stacked'); // 'stacked' | 'fanned' | 'reading'
  const [openCardIndex, setOpenCardIndex] = useState(null); // null | 0 | 1 | 2
  const [inView, setInView] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState(
    'Baralho do conhecimento da arborização fechado. Clique na carta do topo para distribuir as cartas.'
  );

  const sectionRef = useRef(null);
  const inviteBtnRef = useRef(null);
  const cardBtnRefs = useRef([]);
  const closeBtnRefs = useRef([]);

  // IntersectionObserver para disparar a entrada da seção apenas uma vez
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Transição Estado 1 -> Estado 2 (Distribuir cartas em leque)
  const handleDealCards = useCallback(() => {
    setDeckState('fanned');
    setOpenCardIndex(null);
    setLiveAnnouncement(
      'Cartas distribuídas. Três cartas disponíveis: escolha uma carta para ler seu conteúdo.'
    );
    setTimeout(() => {
      cardBtnRefs.current[0]?.focus();
    }, 320);
  }, []);

  // Transição Estado 2 -> Estado 3 (Abrir/virar uma carta específica)
  const handleSelectCard = useCallback((index) => {
    setOpenCardIndex((prevIndex) => {
      if (prevIndex === index) {
        setDeckState('fanned');
        setLiveAnnouncement(`Carta ${ARBOR_CARDS[index].title} fechada.`);
        setTimeout(() => {
          cardBtnRefs.current[index]?.focus();
        }, 50);
        return null;
      }
      setDeckState('reading');
      setLiveAnnouncement(`Carta aberta: ${ARBOR_CARDS[index].title}.`);
      setTimeout(() => {
        closeBtnRefs.current[index]?.focus();
      }, 150);
      return index;
    });
  }, []);

  // Fechar a carta ativa e voltar ao Estado 2 (Leque)
  const handleCloseActiveCard = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      const lastIndex = openCardIndex;
      setOpenCardIndex(null);
      setDeckState('fanned');
      setLiveAnnouncement('Carta fechada. Você está na visualização em leque.');
      if (lastIndex !== null) {
        setTimeout(() => {
          cardBtnRefs.current[lastIndex]?.focus();
        }, 50);
      }
    },
    [openCardIndex]
  );

  // Botão Reembaralhar -> Volta tudo ao Estado 1 (Pilha inicial)
  const handleReshuffle = useCallback(() => {
    setOpenCardIndex(null);
    setDeckState('stacked');
    setLiveAnnouncement(
      'Baralho reembaralhado. Clique na carta-convite para distribuir novamente.'
    );
    setTimeout(() => {
      inviteBtnRef.current?.focus();
    }, 250);
  }, []);

  // Fechar carta com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && deckState === 'reading') {
        handleCloseActiveCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deckState, handleCloseActiveCard]);

  // SVG do circuito-árvore (padrão da logo no verso das cartas)
  const renderCircuitTreeEmblem = () => (
    <svg
      className="arb-emblem-svg"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke="#e8be50"
        strokeWidth="1.2"
        strokeDasharray="6 4"
        opacity="0.65"
      />
      <circle
        cx="60"
        cy="60"
        r="42"
        stroke="#16be7d"
        strokeWidth="1.2"
        opacity="0.45"
      />
      {/* Tronco e trilhas de circuito */}
      <path
        d="M60 95 V55 M60 72 L40 54 V40 M60 64 L80 46 V34 M60 55 L48 38 M60 55 L72 38"
        stroke="#16be7d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nós de circuito dourados e esmeralda */}
      <circle cx="40" cy="40" r="4" fill="#e8be50" />
      <circle cx="80" cy="34" r="4" fill="#e8be50" />
      <circle cx="48" cy="38" r="3.5" fill="#16be7d" />
      <circle cx="72" cy="38" r="3.5" fill="#16be7d" />
      <circle cx="60" cy="28" r="4.5" fill="#e8be50" />
      <path d="M60 55 V28" stroke="#16be7d" strokeWidth="2.5" strokeLinecap="round" />
      {/* Folhas estilizadas */}
      <path
        d="M34 54 C24 50 22 38 32 36 C38 42 38 50 34 54 Z"
        fill="#16be7d"
        opacity="0.85"
      />
      <path
        d="M86 48 C96 44 98 32 88 30 C82 36 82 44 86 48 Z"
        fill="#16be7d"
        opacity="0.85"
      />
    </svg>
  );

  const renderCardIcon = (type) => {
    switch (type) {
      case 'tree':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22v-8M12 14c-4 0-7-3-7-7 0-3 3-5 7-5s7 2 7 5c0 4-3 7-7 7z" />
            <path d="M9 18l3-4 3 4" />
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'danger':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="arb-section"
      id="arborizacao"
      data-deck-state={deckState}
      data-in-view={inView ? 'true' : 'false'}
      aria-labelledby="arb-section-title"
    >
      {/* Região aria-live para leitores de tela anunciarem mudanças de estado */}
      <div className="arb-sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Backdrop invisível para fechar ao clicar fora quando uma carta está aberta (Estado 3) */}
      {deckState === 'reading' && (
        <div
          className="arb-reading-backdrop"
          onClick={handleCloseActiveCard}
          aria-hidden="true"
        />
      )}

      <div className="container arb-container">
        <header className="arb-header">
          <h2 id="arb-section-title" className="arb-title">
            Arborização: O que é e por que é um desafio urgente?
          </h2>
          <p className="arb-subtitle">
            Compreenda a importância vital da cobertura arbórea urbana e o cenário enfrentado no Brasil, no Nordeste e em Sergipe.
          </p>
        </header>

        {/* Barra de controle quando o baralho está aberto (Estados 2 e 3) */}
        <div
          className={`arb-controls ${deckState !== 'stacked' ? 'is-visible' : ''}`}
        >
          <p className="arb-instruction">
            {deckState === 'fanned'
              ? 'Selecione uma carta abaixo para virar e ler o diagnóstico completo:'
              : 'Clique em outra carta para alternar ou feche para voltar ao leque:'}
          </p>
          <button
            type="button"
            className="arb-reshuffle-btn"
            onClick={handleReshuffle}
            aria-label="Reembaralhar cartas e voltar ao monte inicial"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            <span>Reembaralhar</span>
          </button>
        </div>

        {/* Palco do Baralho */}
        <div className="arb-stage">
          {/* CARTA-CONVITE (Topo da pilha no Estado 1) */}
          <button
            ref={inviteBtnRef}
            type="button"
            className={`arb-invite-card ${deckState !== 'stacked' ? 'is-dismissed' : ''}`}
            onClick={handleDealCards}
            aria-expanded={deckState !== 'stacked'}
            aria-controls="arb-cards-deck"
            tabIndex={deckState === 'stacked' ? 0 : -1}
          >
            <span className="arb-card-corner arb-corner-tl" aria-hidden="true">✦</span>
            <span className="arb-card-corner arb-corner-tr" aria-hidden="true">✦</span>
            <div className="arb-invite-emblem">{renderCircuitTreeEmblem()}</div>
            <span className="arb-invite-badge">Baralho do Conhecimento</span>
            <strong className="arb-invite-text">
              Clique aqui e passe as cartas do conhecimento da arborização
            </strong>
            <span className="arb-invite-cta">
              <span>Distribuir 3 Cartas</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="arb-card-corner arb-corner-bl" aria-hidden="true">✦</span>
            <span className="arb-card-corner arb-corner-br" aria-hidden="true">✦</span>
          </button>

          {/* AS 3 CARTAS DE CONTEÚDO */}
          <div className="arb-deck" id="arb-cards-deck" role="list">
            {ARBOR_CARDS.map((card, index) => {
              const isOpen = openCardIndex === index;
              const isOtherOpen = openCardIndex !== null && openCardIndex !== index;

              return (
                <div
                  key={card.id}
                  role="listitem"
                  className={`arb-card-slot arb-slot-${index + 1} ${isOpen ? 'is-open' : ''} ${isOtherOpen ? 'is-dimmed' : ''}`}
                  data-card-index={index}
                  data-card-open={isOpen ? 'true' : 'false'}
                >
                  <div className="arb-card-flipper">
                    {/* VERSO / CAPA DA CARTA (Visível no Estado 1 empilhado e Estado 2 em leque) */}
                    <button
                      ref={(el) => (cardBtnRefs.current[index] = el)}
                      type="button"
                      className="arb-card-face arb-card-back"
                      onClick={() =>
                        deckState === 'stacked'
                          ? handleDealCards()
                          : handleSelectCard(index)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`arb-card-content-${card.id}`}
                      tabIndex={deckState === 'stacked' ? -1 : 0}
                    >
                      <div className="arb-card-back-frame">
                        <div className="arb-card-back-top">
                          <span className="arb-card-number">0{index + 1} / 03</span>
                          <span className="arb-card-suit" aria-hidden="true">
                            {renderCardIcon(card.iconType)}
                          </span>
                        </div>

                        <div className="arb-card-back-center">
                          {renderCircuitTreeEmblem()}
                          <h3 className="arb-card-back-title">{card.title}</h3>
                        </div>

                        <div className="arb-card-back-bottom">
                          <span className="arb-card-flip-prompt">
                            Virar carta e ler ↻
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* FRENTE DE LEITURA DA CARTA (Visível no Estado 3 ao virar a carta; acessível a leitores de tela mesmo virada) */}
                    <article
                      id={`arb-card-content-${card.id}`}
                      className="arb-card-face arb-card-front"
                    >
                      <div className="arb-card-front-header">
                        <div className="arb-card-front-meta">
                          <span className={`arb-card-icon ${card.iconType}`}>
                            {renderCardIcon(card.iconType)}
                          </span>
                          <span className="arb-card-step">Carta 0{index + 1}</span>
                        </div>
                        <button
                          ref={(el) => (closeBtnRefs.current[index] = el)}
                          type="button"
                          className="arb-card-close"
                          onClick={handleCloseActiveCard}
                          aria-label={`Fechar carta ${card.title}`}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          &times;
                        </button>
                      </div>

                      <div className="arb-card-front-body">
                        <h3 className="arb-card-front-title">{card.title}</h3>

                        {card.isHighlight && card.statNum && (
                          <div className="arb-stat-highlight">
                            <span className="arb-stat-num">{card.statNum}</span>
                            <span className="arb-stat-label">
                              {card.statLabel}{' '}
                              {card.statSourceUrl && (
                                <a
                                  href={card.statSourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="arb-stat-source"
                                  tabIndex={isOpen ? 0 : -1}
                                >
                                  ({card.statSourceLabel} ↗)
                                </a>
                              )}
                            </span>
                          </div>
                        )}

                        {card.desc && <p className="arb-card-desc">{card.desc}</p>}

                        {card.bullets && (
                          <ul className="arb-card-list">
                            {card.bullets.map((b, idx) => (
                              <li key={idx}>
                                <strong>{b.label}:</strong> {b.text}{' '}
                                {b.sourceUrl && (
                                  <a
                                    href={b.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="arb-source-badge"
                                    tabIndex={isOpen ? 0 : -1}
                                  >
                                    [Fonte: {b.sourceLabel} ↗]
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}

                        {card.paragraphs &&
                          card.paragraphs.map((p, idx) => (
                            <p
                              key={idx}
                              className="arb-card-desc"
                              dangerouslySetInnerHTML={{
                                __html: p
                                  .replace(
                                    /Censo do IBGE \(2022\)/g,
                                    '<a href="https://censo2022.ibge.gov.br/" target="_blank" rel="noopener noreferrer" class="arb-inline-link"><strong>Censo do IBGE (2022) ↗</strong></a>'
                                  )
                                  .replace(
                                    /Sergipe é o estado brasileiro com o menor índice de vias públicas arborizadas de todo o país\./g,
                                    '<strong>Sergipe é o estado brasileiro com o menor índice de vias públicas arborizadas de todo o país.</strong>'
                                  )
                                  .replace(
                                    /ilhas de calor/g,
                                    '<a href="https://www.gov.br/mma/pt-br" target="_blank" rel="noopener noreferrer" class="arb-inline-link"><strong>ilhas de calor ↗</strong></a>'
                                  )
                                  .replace(
                                    /Arborização Inteligente/g,
                                    '<strong>Arborização Inteligente</strong>'
                                  )
                              }}
                            />
                          ))}

                        {card.officialSource && (
                          <div className="arb-official-source">
                            <span className="arb-official-label">
                              Fonte Oficial Citada:
                            </span>
                            <a
                              href={card.officialSource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="arb-official-link"
                              tabIndex={isOpen ? 0 : -1}
                            >
                              <strong>{card.officialSource.name}</strong>
                              <span>{card.officialSource.doc} ↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
