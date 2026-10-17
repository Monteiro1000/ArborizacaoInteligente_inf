import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Icon } from './IconSprite';
import CardImage from './CardImage';
import { useLanguage } from '../context/LanguageContext';

/**
 * Geometria base dos nós e galhos da Árvore Interativa em SVG
 */
const TREE_GEOMETRY = {
  satelite: {
    side: 'right',
    nodeX: 470,
    nodeY: 110,
    branchPath: 'M 340 245 L 340 150 L 380 110 L 470 110',
    iconType: 'satellite'
  },
  drones: {
    side: 'left',
    nodeX: 210,
    nodeY: 220,
    branchPath: 'M 340 315 L 340 260 L 300 220 L 210 220',
    iconType: 'drone'
  },
  sensores: {
    side: 'right',
    nodeX: 470,
    nodeY: 330,
    branchPath: 'M 340 400 L 340 370 L 380 330 L 470 330',
    iconType: 'sensor'
  },
  cadastro: {
    side: 'left',
    nodeX: 210,
    nodeY: 515,
    branchPath: 'M 340 435 L 340 475 L 300 515 L 210 515',
    iconType: 'root'
  }
};

const FEATURED_PLAN_ID = 'drones';

export default function SolutionSection() {
  const { dict } = useLanguage();
  const solDict = dict.solution;

  const plans = useMemo(() => {
    return solDict.plans.map((p) => ({
      ...p,
      ...(TREE_GEOMETRY[p.id] || TREE_GEOMETRY.satelite)
    }));
  }, [solDict.plans]);

  const [treeGrown, setTreeGrown] = useState(false);
  const [activePlanIndex, setActivePlanIndex] = useState(null); // null | 0 | 1 | 2 | 3
  const [hoverPlanId, setHoverPlanId] = useState(null);
  const [liveMessage, setLiveMessage] = useState('');

  const treeSectionRef = useRef(null);
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);
  const closeBtnRef = useRef(null);

  const activePlan = activePlanIndex !== null ? plans[activePlanIndex] : null;

  // IntersectionObserver: dispara o crescimento da árvore em SVG uma única vez
  useEffect(() => {
    const el = treeSectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setTreeGrown(true);
      return;
    }

    const timer = setTimeout(() => {
      setTreeGrown(true);
    }, 600);

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(timer);
            setTreeGrown(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Selecionar ou alternar um nó da árvore
  const handleSelectNode = useCallback(
    (index) => {
      setActivePlanIndex((prev) => {
        if (prev === index) {
          setLiveMessage(`${plans[index].shortTitle}`);
          setTimeout(() => {
            nodeRefs.current[index]?.focus();
          }, 50);
          return null;
        }
        setLiveMessage(`${plans[index].title}. ${plans[index].summary}`);
        setTimeout(() => {
          closeBtnRef.current?.focus();
        }, 120);
        return index;
      });
    },
    [plans]
  );

  // Fechar o painel ativo e devolver o foco ao nó correspondente
  const handleClosePanel = useCallback(() => {
    setActivePlanIndex((prev) => {
      if (prev !== null) {
        const lastIndex = prev;
        setTimeout(() => {
          nodeRefs.current[lastIndex]?.focus();
        }, 50);
      }
      return null;
    });
  }, []);

  const handlePrevPlan = useCallback(() => {
    setActivePlanIndex((prev) => {
      if (prev === null) return 0;
      const nextIdx = (prev - 1 + plans.length) % plans.length;
      setLiveMessage(plans[nextIdx].title);
      return nextIdx;
    });
  }, [plans]);

  const handleNextPlan = useCallback(() => {
    setActivePlanIndex((prev) => {
      if (prev === null) return 0;
      const nextIdx = (prev + 1) % plans.length;
      setLiveMessage(plans[nextIdx].title);
      return nextIdx;
    });
  }, [plans]);

  // Tecla ESC fecha o painel aberto
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && activePlanIndex !== null) {
        handleClosePanel();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePlanIndex, handleClosePanel]);

  // Clique fora da árvore/painel fecha o painel ativo
  const handleStageBackdropClick = useCallback(
    (e) => {
      if (activePlanIndex === null) return;
      if (
        e.target.classList.contains('arvplanos-layout') ||
        e.target.classList.contains('arvplanos-tree-col') ||
        e.target.classList.contains('arvplanos-svg')
      ) {
        handleClosePanel();
      }
    },
    [activePlanIndex, handleClosePanel]
  );

  const renderPlanIcon = (type) => {
    switch (type) {
      case 'satellite':
        return <Icon name="satellite" size="lg" />;
      case 'drone':
        return <Icon name="drone-duotone" size="lg" />;
      case 'sensor':
        return <Icon name="cpu-duotone" size="lg" />;
      case 'root':
      default:
        return <Icon name="clipboard-text-duotone" size="lg" />;
    }
  };

  return (
    <section className="solution-section" id="solucao">
      <div className="container">
        <div className="section-header text-center">
          <p className="eyebrow eyebrow-dark" data-i18n="solution.eyebrow">
            {solDict.eyebrow}
          </p>
          <h2 data-i18n="solution.title">{solDict.title}</h2>
          <p className="section-text" data-i18n="solution.subtitle">
            {solDict.subtitle}
          </p>
        </div>

        {/* Vídeo Explicativo do Projeto */}
        <div className="solution-video-showcase reveal">
          <div className="solution-video-frame">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/qVLRZMfHiZE?si=u-ywzkvD7ejwf8Ds"
              title={solDict.videoTitle}
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* =================================================================
            SEÇÃO DE PLANOS: ÁRVORE INTERATIVA EM SVG (.arvplanos-*)
            ================================================================= */}
        <div
          ref={treeSectionRef}
          id="tecnologia"
          className="arvplanos-wrapper"
          data-tree-grown={treeGrown ? 'true' : 'false'}
          data-active-plan={activePlan ? activePlan.id : 'none'}
          data-hover-plan={hoverPlanId || 'none'}
        >
          <div className="arvplanos-sr-only" aria-live="polite" aria-atomic="true">
            {liveMessage}
          </div>

          <div className="arvplanos-header text-center">
            <span className="arvplanos-badge" data-i18n="solution.treeBadge">
              {solDict.treeBadge}
            </span>
            <h3 className="arvplanos-title" data-i18n="solution.treeTitle">
              {solDict.treeTitle}
            </h3>
            <p className="arvplanos-subtitle" data-i18n="solution.treeSubtitle">
              {solDict.treeSubtitle}
            </p>
          </div>

          {/* Lista semântica oculta visualmente (sr-only) para leitores de tela e SEO */}
          <ul className="arvplanos-sr-only" aria-label={solDict.srListAria}>
            {plans.map((p) => (
              <li key={p.id}>
                <h4>
                  {p.altitudeLabel}: {p.title}
                </h4>
                <p>{p.summary}</p>
                <ul>
                  {p.howItWorks.map((item, i) => (
                    <li key={i}>{item.text}</li>
                  ))}
                </ul>
                <p>
                  {solDict.audienceLabel}: {p.audience}
                </p>
                <p>
                  {solDict.priceLabel}: {p.price}
                </p>
              </li>
            ))}
          </ul>

          {activePlan && (
            <div
              className="arvplanos-backdrop"
              onClick={handleClosePanel}
              aria-hidden="true"
            />
          )}

          <div
            ref={stageRef}
            className={`arvplanos-layout ${activePlan ? 'has-open-panel' : ''}`}
            onClick={handleStageBackdropClick}
          >
            {/* COLUNA DA ÁRVORE SVG */}
            <div className="arvplanos-tree-col">
              <svg
                className="arvplanos-svg"
                viewBox="0 0 680 610"
                role="group"
                aria-label={solDict.treeAria}
              >
                <defs>
                  <linearGradient id="arvplanos-trunk-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0c8555" />
                    <stop offset="50%" stopColor="#16be7d" />
                    <stop offset="100%" stopColor="#4be3a8" />
                  </linearGradient>

                  <linearGradient id="arvplanos-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8be50" />
                    <stop offset="100%" stopColor="#ffdf80" />
                  </linearGradient>

                  <filter id="arvplanos-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Halo radial da copa ao fundo */}
                <g className="arvplanos-canopy-aura" aria-hidden="true">
                  <circle cx="340" cy="235" r="185" fill="rgba(22, 190, 125, 0.06)" />
                  <circle
                    cx="340"
                    cy="235"
                    r="150"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.2)"
                    strokeWidth="1.2"
                    strokeDasharray="6 6"
                  />
                  <path
                    className="arvplanos-foliage-ring"
                    d="M 225 320 C 165 280 170 185 235 140 C 265 85 330 60 340 60 C 350 60 415 85 445 140 C 510 185 515 280 455 320"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.25)"
                    strokeWidth="1.5"
                    pathLength="100"
                  />
                </g>

                {/* Linha divisória solo / subsolo */}
                <g className="arvplanos-ground-line" aria-hidden="true">
                  <line
                    x1="120"
                    y1="435"
                    x2="560"
                    y2="435"
                    stroke="rgba(232, 190, 80, 0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                  />
                  <text
                    x="555"
                    y="426"
                    textAnchor="end"
                    fill="rgba(232, 190, 80, 0.65)"
                    fontSize="10"
                    fontWeight="700"
                    letterSpacing="0.08em"
                  >
                    {solDict.soilLabel}
                  </text>
                </g>

                {/* TRONCO CENTRAL E RAÍZES SECUNDÁRIAS DECORATIVAS */}
                <g className="arvplanos-trunk-group" aria-hidden="true">
                  <path
                    className="arvplanos-draw-path arvplanos-delay-1"
                    d="M 330 435 L 330 190 L 310 170"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.45)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <path
                    className="arvplanos-draw-path arvplanos-delay-1"
                    d="M 350 435 L 350 180 L 375 155"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.45)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <path
                    className="arvplanos-draw-path arvplanos-trunk-main"
                    d="M 340 435 L 340 95"
                    fill="none"
                    stroke="url(#arvplanos-trunk-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength="100"
                  />
                  <path
                    className="arvplanos-draw-path arvplanos-delay-2"
                    d="M 340 435 L 340 470 L 385 515 L 445 515"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.4)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <path
                    className="arvplanos-draw-path arvplanos-delay-2"
                    d="M 340 470 L 340 555 L 365 580"
                    fill="none"
                    stroke="rgba(22, 190, 125, 0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <circle cx="340" cy="95" r="4.5" fill="#e8be50" />
                  <circle cx="310" cy="170" r="3.5" fill="#16be7d" />
                  <circle cx="375" cy="155" r="3.5" fill="#16be7d" />
                  <circle cx="445" cy="515" r="3.5" fill="#16be7d" />
                  <circle cx="365" cy="580" r="3" fill="#e8be50" />
                </g>

                {/* OS 4 GALHOS/RAIZ DOS PLANOS E SEUS NÓS INTERATIVOS */}
                {plans.map((plan, index) => {
                  const isActive = activePlanIndex === index;
                  const isHovered = hoverPlanId === plan.id;
                  const isFeatured = FEATURED_PLAN_ID === plan.id;
                  const isRight = plan.side === 'right';
                  const labelX = isRight ? plan.nodeX + 28 : plan.nodeX - 28;
                  const textAnchor = isRight ? 'start' : 'end';

                  return (
                    <g
                      key={plan.id}
                      className={`arvplanos-branch-unit arvplanos-unit-${plan.id} ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                      data-plan-id={plan.id}
                    >
                      <path
                        className={`arvplanos-branch-path arvplanos-delay-${index + 1}`}
                        d={plan.branchPath}
                        fill="none"
                        stroke={isActive || isHovered ? '#e8be50' : '#16be7d'}
                        strokeWidth={isActive || isHovered ? '4' : '3'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength="100"
                        filter={isActive || isHovered ? 'url(#arvplanos-glow)' : undefined}
                      />

                      <path
                        className="arvplanos-energy-pulse"
                        d={plan.branchPath}
                        fill="none"
                        stroke="#e8be50"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength="100"
                        filter="url(#arvplanos-glow)"
                      />

                      <g
                        ref={(el) => (nodeRefs.current[index] = el)}
                        className="arvplanos-node-group"
                        role="button"
                        tabIndex={0}
                        aria-label={`${solDict.planWord} ${plan.shortTitle} (${plan.altitudeLabel})`}
                        aria-expanded={isActive}
                        aria-controls="arvplanos-detail-panel"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectNode(index);
                        }}
                        onMouseEnter={() => setHoverPlanId(plan.id)}
                        onMouseLeave={() => setHoverPlanId(null)}
                        onFocus={() => setHoverPlanId(plan.id)}
                        onBlur={() => setHoverPlanId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectNode(index);
                          }
                        }}
                      >
                        <rect
                          x={isRight ? plan.nodeX - 26 : plan.nodeX - 205}
                          y={plan.nodeY - 28}
                          width="230"
                          height="56"
                          rx="12"
                          fill="transparent"
                        />

                        <circle
                          className="arvplanos-node-pulse"
                          cx={plan.nodeX}
                          cy={plan.nodeY}
                          r="20"
                          fill="none"
                          stroke={isActive ? '#16be7d' : '#e8be50'}
                          strokeWidth="1.8"
                        />

                        <circle
                          className="arvplanos-node-core"
                          cx={plan.nodeX}
                          cy={plan.nodeY}
                          r="13"
                          fill={isActive ? '#16be7d' : '#050e64'}
                          stroke={isActive ? '#ffffff' : '#e8be50'}
                          strokeWidth="3"
                          filter={isActive ? 'url(#arvplanos-glow)' : undefined}
                        />

                        <text
                          x={plan.nodeX}
                          y={plan.nodeY + 4}
                          textAnchor="middle"
                          fill={isActive ? '#03093f' : '#e8be50'}
                          fontSize="10.5"
                          fontWeight="800"
                        >
                          {plan.num}
                        </text>

                        <text
                          className="arvplanos-node-meta"
                          x={labelX}
                          y={plan.nodeY - 9}
                          textAnchor={textAnchor}
                        >
                          {plan.altitudeLabel.toUpperCase()}
                          {isFeatured ? ` • ${solDict.featuredTag}` : ''}
                        </text>
                        <text
                          className="arvplanos-node-label"
                          x={labelX}
                          y={plan.nodeY + 11}
                          textAnchor={textAnchor}
                        >
                          {plan.shortTitle}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              <p className="arvplanos-hint" data-i18n="solution.treeHint">
                {solDict.treeHint}
              </p>
            </div>

            {/* PAINEL LATERAL (Desktop) / BOTTOM SHEET (Mobile) */}
            <div
              id="arvplanos-detail-panel"
              role="dialog"
              aria-modal="false"
              aria-labelledby="arvplanos-panel-title"
              aria-hidden={!activePlan}
              className={`arvplanos-panel ${activePlan ? 'is-open' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {activePlan && (
                <div className="arvplanos-panel-inner">
                  <div className="arvplanos-panel-top">
                    <div className="arvplanos-panel-badges">
                      <span className="arvplanos-panel-altitude">
                        {activePlan.altitudeLabel} • {solDict.planWord} {activePlan.num}
                      </span>
                      {FEATURED_PLAN_ID === activePlan.id && (
                        <span className="arvplanos-panel-featured">
                          <Icon name="sparkle-duotone" size="sm" className="ic-inline" />
                          <span>{solDict.featuredBadge}</span>
                        </span>
                      )}
                    </div>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      className="arvplanos-panel-close ic-btn"
                      onClick={handleClosePanel}
                      aria-label={solDict.closePanelAria}
                    >
                      <Icon name="x-duotone" size="md" />
                    </button>
                  </div>

                  <div className="arvplanos-panel-image-wrapper">
                    <CardImage
                      src={activePlan.image?.src || `images/cards/plano-${activePlan.id}.webp`}
                      alt={activePlan.image?.alt || activePlan.title}
                      placeholderTitle={activePlan.title}
                      aspectRatio="16/9"
                      width={800}
                      height={450}
                      loading="lazy"
                    />
                  </div>

                  <div className="arvplanos-panel-header">
                    <div
                      className="arvplanos-panel-icon icone-badge ic-badge-plan is-active"
                      aria-hidden="true"
                    >
                      {renderPlanIcon(activePlan.iconType)}
                    </div>
                    <div>
                      <h4 id="arvplanos-panel-title" className="arvplanos-panel-title">
                        {activePlan.title}
                      </h4>
                      <p className="arvplanos-panel-summary">{activePlan.summary}</p>
                    </div>
                  </div>

                  <div className="arvplanos-panel-section">
                    <h5 className="arvplanos-panel-subtitle">{solDict.howItWorksTitle}</h5>
                    <ul className="arvplanos-panel-list">
                      {activePlan.howItWorks.map((topic, idx) => (
                        <li key={idx}>
                          <span className="arvplanos-check" aria-hidden="true">
                            <Icon name="check-circle-duotone" size="sm" />
                          </span>
                          <span>
                            {topic.text}{' '}
                            {topic.sourceUrl && (
                              <a
                                href={topic.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="arvplanos-source-link"
                              >
                                <span>({topic.sourceLabel}</span>
                                <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                                <span>)</span>
                              </a>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="arvplanos-panel-meta-grid">
                    <div className="arvplanos-meta-box">
                      <span className="arvplanos-meta-label">{solDict.audienceLabel}</span>
                      <strong className="arvplanos-meta-value">
                        {activePlan.audience}
                      </strong>
                    </div>
                    <div className="arvplanos-meta-box">
                      <span className="arvplanos-meta-label">{solDict.priceLabel}</span>
                      <strong className="arvplanos-meta-value arvplanos-price">
                        {activePlan.price}
                      </strong>
                    </div>
                  </div>

                  <div className="arvplanos-panel-footer">
                    <a
                      href="#contato"
                      className="arvplanos-cta-btn ic-interactive"
                      onClick={() => setActivePlanIndex(null)}
                    >
                      <span>{solDict.ctaText}</span>
                      <Icon name="arrow-right-duotone" size="sm" />
                    </a>

                    <div className="arvplanos-nav-arrows">
                      <button
                        type="button"
                        className="arvplanos-arrow-btn ic-interactive"
                        onClick={handlePrevPlan}
                        aria-label={solDict.prevAria}
                      >
                        <Icon name="arrow-left-duotone" size="sm" />
                        <span>{solDict.prevBtn}</span>
                      </button>
                      <span className="arvplanos-step-indicator">
                        {activePlanIndex + 1} / {plans.length}
                      </span>
                      <button
                        type="button"
                        className="arvplanos-arrow-btn ic-interactive"
                        onClick={handleNextPlan}
                        aria-label={solDict.nextAria}
                      >
                        <span>{solDict.nextBtn}</span>
                        <Icon name="arrow-right-duotone" size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
