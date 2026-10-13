import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ARBOR_CARDS } from '../data/arborData';
import { Icon } from './IconSprite';

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

  // Logo oficial do projeto no topo da carta-convite e no verso das 3 cartas
  const renderCircuitTreeEmblem = () => (
    <img
      src="assets/logo.png"
      alt="Logo Arborização Inteligente"
      className="arb-emblem-logo"
      decoding="async"
    />
  );

  // Mapeamento semântico de ícones das 3 cartas (@phosphor-icons/core Duotone)
  const renderCardIcon = (type) => {
    switch (type) {
      case 'tree':
        return <Icon name="tree-duotone" size="md" />;
      case 'warning':
        return <Icon name="thermometer-hot-duotone" size="md" />;
      case 'danger':
        return <Icon name="map-pin-area-duotone" size="md" />;
      default:
        return <Icon name="tree-duotone" size="md" />;
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
            className="arb-reshuffle-btn ic-interactive"
            onClick={handleReshuffle}
            aria-label="Reembaralhar cartas e voltar ao monte inicial"
          >
            <Icon name="shuffle-duotone" size="sm" />
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
            <span className="arb-card-corner arb-corner-tl" aria-hidden="true">
              <Icon name="sparkle-duotone" size="sm" className="ic-corner-sparkle" />
            </span>
            <span className="arb-card-corner arb-corner-tr" aria-hidden="true">
              <Icon name="sparkle-duotone" size="sm" className="ic-corner-sparkle" />
            </span>
            <div className="arb-invite-emblem">{renderCircuitTreeEmblem()}</div>
            <span className="arb-invite-badge">Baralho do Conhecimento</span>
            <strong className="arb-invite-text">
              Clique aqui e passe as cartas do conhecimento da arborização
            </strong>
            <span className="arb-invite-cta ic-interactive">
              <span>Distribuir 3 Cartas</span>
              <Icon name="arrow-right-duotone" size="sm" />
            </span>
            <span className="arb-card-corner arb-corner-bl" aria-hidden="true">
              <Icon name="sparkle-duotone" size="sm" className="ic-corner-sparkle" />
            </span>
            <span className="arb-card-corner arb-corner-br" aria-hidden="true">
              <Icon name="sparkle-duotone" size="sm" className="ic-corner-sparkle" />
            </span>
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
                          <span className="arb-card-suit icone-badge ic-badge-card" aria-hidden="true">
                            {renderCardIcon(card.iconType)}
                          </span>
                        </div>

                        <div className="arb-card-back-center">
                          {renderCircuitTreeEmblem()}
                          <h3 className="arb-card-back-title">{card.title}</h3>
                        </div>

                        <div className="arb-card-back-bottom">
                          <span className="arb-card-flip-prompt">
                            <span>Virar carta e ler</span>
                            <Icon name="arrows-clockwise-duotone" size="sm" className="ic-inline" />
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
                          <span
                            className={`arb-card-icon icone-badge ic-badge-card ${isOpen ? 'is-active' : ''}`}
                            aria-hidden="true"
                          >
                            {renderCardIcon(card.iconType)}
                          </span>
                          <span className="arb-card-step">Carta 0{index + 1}</span>
                        </div>
                        <button
                          ref={(el) => (closeBtnRefs.current[index] = el)}
                          type="button"
                          className="arb-card-close ic-btn"
                          onClick={handleCloseActiveCard}
                          aria-label={`Fechar carta ${card.title}`}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <Icon name="x-duotone" size="md" />
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
                                  <span>({card.statSourceLabel}</span>
                                  <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                                  <span>)</span>
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
                                    <span>[Fonte: {b.sourceLabel}</span>
                                    <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                                    <span>]</span>
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
                                    '<a href="https://censo2022.ibge.gov.br/" target="_blank" rel="noopener noreferrer" class="arb-inline-link"><strong>Censo do IBGE (2022)</strong> <svg viewBox="0 0 256 256" class="ic-svg ic-sm ic-inline-ext" aria-hidden="true" focusable="false"><use href="#ic-arrow-square-out-duotone"></use></svg></a>'
                                  )
                                  .replace(
                                    /Sergipe é o estado brasileiro com o menor índice de vias públicas arborizadas de todo o país\./g,
                                    '<strong>Sergipe é o estado brasileiro com o menor índice de vias públicas arborizadas de todo o país.</strong>'
                                  )
                                  .replace(
                                    /ilhas de calor/g,
                                    '<a href="https://www.gov.br/mma/pt-br" target="_blank" rel="noopener noreferrer" class="arb-inline-link"><strong>ilhas de calor</strong> <svg viewBox="0 0 256 256" class="ic-svg ic-sm ic-inline-ext" aria-hidden="true" focusable="false"><use href="#ic-arrow-square-out-duotone"></use></svg></a>'
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
                              <span className="ic-inline-group">
                                <span>{card.officialSource.doc}</span>
                                <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                              </span>
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
