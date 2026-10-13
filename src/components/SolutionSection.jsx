import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AUDIENCE_SEGMENTS } from '../data/solutionData';
import { Icon } from './IconSprite';

/**
 * DADOS DOS 4 PLANOS DA ÁRVORE INTERATIVA (Edite textos, preços e links aqui)
 * Metáfora de altitude: do mais abrangente (Galho Alto) ao mais pontual/estrutural (Raiz).
 */
export const ARVPLANOS_CONFIG = {
  featuredPlanId: 'drones', // ID do plano com selo "Mais indicado" (ou "nenhum")
  ctaText: 'Solicitar Proposta deste Plano',
  ctaHref: '#contato',
  plans: [
    {
      id: 'satelite',
      num: '01',
      altitudeLabel: 'Galho Alto',
      shortTitle: 'Satélite',
      title: 'Satélite - Plano Base',
      summary:
        'Mapeamento e diagnóstico macroscópico por sensoriamento remoto via satélite.',
      howItWorks: [
        {
          text: 'Imagens de satélite multiespectrais em alta resolução espacial',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Cálculo de índices de vegetação (NDVI)',
          sourceLabel: 'INPE / Sensoriamento Remoto',
          sourceUrl: 'https://earthobservatory.nasa.gov/features/MeasuringVegetation'
        },
        {
          text: 'Identificação de áreas com déficit crítico de cobertura vegetal e relatório panorâmico municipal',
          sourceLabel: null,
          sourceUrl: null
        }
      ],
      audience: 'Diagnóstico inicial para municípios',
      price: '[A DEFINIR]',
      side: 'right',
      nodeX: 470,
      nodeY: 110,
      branchPath: 'M 340 245 L 340 150 L 380 110 L 470 110',
      iconType: 'satellite'
    },
    {
      id: 'drones',
      num: '02',
      altitudeLabel: 'Galho Médio',
      shortTitle: 'Drones',
      title: 'Drones - Plano Integrado a Drones',
      summary:
        'Análise avançada da cobertura vegetal e copas através de voos aéreos especializados.',
      howItWorks: [
        {
          text: 'Voo automatizado com sensores de alta definição óptica',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Modelagem tridimensional (3D) e ortomosaicos georreferenciados',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Detecção precoce de pragas, galhos secos, risco de tombamento e avaliação volumétrica da copa',
          sourceLabel: null,
          sourceUrl: null
        }
      ],
      audience: 'Grandes avenidas, praças e corredores verdes',
      price: '[A DEFINIR]',
      side: 'left',
      nodeX: 210,
      nodeY: 220,
      branchPath: 'M 340 315 L 340 260 L 300 220 L 210 220',
      iconType: 'drone'
    },
    {
      id: 'sensores',
      num: '03',
      altitudeLabel: 'Galho Baixo',
      shortTitle: 'Sensores por Árvore',
      title: 'Sensores por Árvore - Plano Sensores IoT',
      summary:
        'Monitoramento contínuo em tempo real por telemetria dedicada e Internet das Coisas.',
      howItWorks: [
        {
          text: 'Estações de monitoramento IoT em vias críticas e árvores estratégicas',
          sourceLabel: 'Espressif IoT',
          sourceUrl: 'https://www.espressif.com/en/products/socs/esp32'
        },
        {
          text: 'Leitura 24/7 de microclima: umidade do ar, temperatura e umidade do solo',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Alertas automáticos preditivos de estresse hídrico, risco fitossanitário e visão computacional',
          sourceLabel: null,
          sourceUrl: null
        }
      ],
      audience: 'Locais críticos com ilhas de calor e árvores históricas',
      price: '[A DEFINIR]',
      side: 'right',
      nodeX: 470,
      nodeY: 330,
      branchPath: 'M 340 400 L 340 370 L 380 330 L 470 330',
      iconType: 'sensor'
    },
    {
      id: 'cadastro',
      num: '04',
      altitudeLabel: 'Raiz',
      shortTitle: 'Cadastro em Campo',
      title: 'Cadastro Técnico em Campo - Plano Técnico',
      summary:
        'Ambiente interativo corporativo para técnicos e gestores mapearem e gerenciarem árvores.',
      howItWorks: [
        {
          text: 'Dashboard de gestão técnica para prefeituras e secretarias com geolocalização individual',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Histórico completo de podas, adubações, laudos fitossanitários e manutenções',
          sourceLabel: null,
          sourceUrl: null
        },
        {
          text: 'Classificação assistida de espécies nativas versus invasoras',
          sourceLabel: 'Flora do Brasil 2020',
          sourceUrl: 'http://floradobrasil.jbrj.gov.br/'
        }
      ],
      audience: 'Secretarias de Meio Ambiente e Obras',
      price: '[A DEFINIR]',
      side: 'left',
      nodeX: 210,
      nodeY: 515,
      branchPath: 'M 340 435 L 340 475 L 300 515 L 210 515',
      iconType: 'root'
    }
  ]
};

export default function SolutionSection() {
  const { plans, featuredPlanId, ctaText, ctaHref } = ARVPLANOS_CONFIG;

  const [treeGrown, setTreeGrown] = useState(false);
  const [activePlanIndex, setActivePlanIndex] = useState(null); // null | 0 | 1 | 2 | 3
  const [hoverPlanId, setHoverPlanId] = useState(null);
  const [liveMessage, setLiveMessage] = useState('');

  const treeSectionRef = useRef(null);
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);
  const closeBtnRef = useRef(null);

  const activePlan = activePlanIndex !== null ? plans[activePlanIndex] : null;

  // 1. IntersectionObserver: dispara o crescimento da árvore em SVG uma única vez
  useEffect(() => {
    const el = treeSectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setTreeGrown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTreeGrown(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Selecionar ou alternar um nó da árvore
  const handleSelectNode = useCallback(
    (index) => {
      setActivePlanIndex((prev) => {
        if (prev === index) {
          setLiveMessage(`Painel do plano ${plans[index].shortTitle} fechado.`);
          setTimeout(() => {
            nodeRefs.current[index]?.focus();
          }, 50);
          return null;
        }
        setLiveMessage(
          `Plano selecionado: ${plans[index].title}. ${plans[index].summary}`
        );
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
        setLiveMessage('Painel de plano fechado.');
        setTimeout(() => {
          nodeRefs.current[lastIndex]?.focus();
        }, 50);
      }
      return null;
    });
  }, []);

  // Navegar para o plano anterior/próximo dentro do painel
  const handlePrevPlan = useCallback(() => {
    setActivePlanIndex((prev) => {
      if (prev === null) return 0;
      const nextIdx = (prev - 1 + plans.length) % plans.length;
      setLiveMessage(`Navegou para: ${plans[nextIdx].title}`);
      return nextIdx;
    });
  }, [plans]);

  const handleNextPlan = useCallback(() => {
    setActivePlanIndex((prev) => {
      if (prev === null) return 0;
      const nextIdx = (prev + 1) % plans.length;
      setLiveMessage(`Navegou para: ${plans[nextIdx].title}`);
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

  // Ícones vetoriais de cada plano no painel (Sprite SVG local)
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
          <p className="eyebrow eyebrow-dark">Tecnologia &amp; Inovação</p>
          <h2>Nossa Solução: Monitoramento Arbóreo Inteligente</h2>
          <p className="section-text">
            Um sistema de monitoramento arbóreo capaz de analisar áreas com déficit vegetal, avaliar a saúde das árvores em tempo real e diferenciar espécies nativas de invasoras por meio de sensores IoT, inteligência artificial e drones.
          </p>
        </div>

        {/* Vídeo Explicativo do Projeto */}
        <div className="solution-video-showcase reveal">
          <div className="solution-video-frame">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/qVLRZMfHiZE?si=u-ywzkvD7ejwf8Ds"
              title="YouTube video player"
              frameBorder="0"
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
          className="arvplanos-wrapper"
          data-tree-grown={treeGrown ? 'true' : 'false'}
          data-active-plan={activePlan ? activePlan.id : 'none'}
          data-hover-plan={hoverPlanId || 'none'}
        >
          {/* Região aria-live para anunciar abertura e troca de planos */}
          <div className="arvplanos-sr-only" aria-live="polite" aria-atomic="true">
            {liveMessage}
          </div>

          <div className="arvplanos-header text-center">
            <span className="arvplanos-badge">Modelos de Atendimento</span>
            <h3 className="arvplanos-title">
              Os 4 Planos do Projeto Arborização Inteligente
            </h3>
            <p className="arvplanos-subtitle">
              Da visão orbital por satélite até a raiz cadastrada em campo: clique em cada galho ou raiz da árvore-circuito para explorar o plano correspondente.
            </p>
          </div>

          {/* Lista semântica oculta visualmente (sr-only) para leitores de tela e SEO */}
          <ul className="arvplanos-sr-only" aria-label="Resumo completo dos 4 planos">
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
                <p>Público-alvo: {p.audience}</p>
                <p>Investimento: {p.price}</p>
              </li>
            ))}
          </ul>

          {/* Backdrop para fechar bottom sheet no mobile ou ao clicar fora */}
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
                aria-label="Árvore interativa dos 4 planos de monitoramento arbóreo"
              >
                <defs>
                  {/* Gradiente do tronco e galhos (Verde Esmeralda) */}
                  <linearGradient id="arvplanos-trunk-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0c8555" />
                    <stop offset="50%" stopColor="#16be7d" />
                    <stop offset="100%" stopColor="#4be3a8" />
                  </linearGradient>

                  {/* Gradiente Dourado para hover e destaque */}
                  <linearGradient id="arvplanos-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8be50" />
                    <stop offset="100%" stopColor="#ffdf80" />
                  </linearGradient>

                  {/* Filtro de brilho (Glow) para nós e trilhas ativas */}
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
                  {/* Contorno geométrico estilizado de copa e folhas em circuito */}
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
                    SOLO URBANO
                  </text>
                </g>

                {/* TRONCO CENTRAL E RAÍZES SECUNDÁRIAS DECORATIVAS (Estilo Circuito 45°/90°) */}
                <g className="arvplanos-trunk-group" aria-hidden="true">
                  {/* Trilhas paralelas laterais do tronco */}
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
                  {/* Eixo principal do tronco */}
                  <path
                    className="arvplanos-draw-path arvplanos-trunk-main"
                    d="M 340 435 L 340 95"
                    fill="none"
                    stroke="url(#arvplanos-trunk-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength="100"
                  />
                  {/* Raízes secundárias decorativas à direita e centro */}
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
                  const isFeatured = featuredPlanId === plan.id;
                  const isRight = plan.side === 'right';
                  const labelX = isRight ? plan.nodeX + 28 : plan.nodeX - 28;
                  const textAnchor = isRight ? 'start' : 'end';

                  return (
                    <g
                      key={plan.id}
                      className={`arvplanos-branch-unit arvplanos-unit-${plan.id} ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                      data-plan-id={plan.id}
                    >
                      {/* Caminho base do galho/raiz (desenhado na entrada via stroke-dashoffset) */}
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

                      {/* Pulso de energia fluindo do tronco até o nó quando o plano está ativo */}
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

                      {/* Nó clicável e acessível + Rótulo sempre visível */}
                      <g
                        ref={(el) => (nodeRefs.current[index] = el)}
                        className="arvplanos-node-group"
                        role="button"
                        tabIndex={0}
                        aria-label={`Plano ${plan.shortTitle} (${plan.altitudeLabel})`}
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
                        {/* Área de toque generosa (>= 44x44px) cobrindo nó e rótulo */}
                        <rect
                          x={isRight ? plan.nodeX - 26 : plan.nodeX - 205}
                          y={plan.nodeY - 28}
                          width="230"
                          height="56"
                          rx="12"
                          fill="transparent"
                        />

                        {/* Anel pulsante discreto ao redor do nó */}
                        <circle
                          className="arvplanos-node-pulse"
                          cx={plan.nodeX}
                          cy={plan.nodeY}
                          r="20"
                          fill="none"
                          stroke={isActive ? '#16be7d' : '#e8be50'}
                          strokeWidth="1.8"
                        />

                        {/* Círculo principal do nó (Dourado em repouso, Verde Esmeralda com glow quando ativo) */}
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

                        {/* Ponto central / número */}
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

                        {/* Rótulo sempre visível ao lado do nó */}
                        <text
                          className="arvplanos-node-meta"
                          x={labelX}
                          y={plan.nodeY - 9}
                          textAnchor={textAnchor}
                        >
                          {plan.altitudeLabel.toUpperCase()}
                          {isFeatured ? ' • MAIS INDICADO' : ''}
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

              <p className="arvplanos-hint">
                Clique em qualquer nó dourado da árvore para inspecionar o plano
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
                  {/* Barra superior do painel */}
                  <div className="arvplanos-panel-top">
                    <div className="arvplanos-panel-badges">
                      <span className="arvplanos-panel-altitude">
                        {activePlan.altitudeLabel} Plano {activePlan.num}
                      </span>
                      {featuredPlanId === activePlan.id && (
                        <span className="arvplanos-panel-featured">
                          <Icon name="sparkle-duotone" size="sm" className="ic-inline" />
                          <span>Mais indicado</span>
                        </span>
                      )}
                    </div>
                    <button
                      ref={closeBtnRef}
                      type="button"
                      className="arvplanos-panel-close ic-btn"
                      onClick={handleClosePanel}
                      aria-label="Fechar painel do plano"
                    >
                      <Icon name="x-duotone" size="md" />
                    </button>
                  </div>

                  {/* Cabeçalho com ícone (.icone-badge) e título */}
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

                  {/* Como funciona (3 tópicos) */}
                  <div className="arvplanos-panel-section">
                    <h5 className="arvplanos-panel-subtitle">Como funciona</h5>
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

                  {/* Metadados: Público-Alvo e Preço */}
                  <div className="arvplanos-panel-meta-grid">
                    <div className="arvplanos-meta-box">
                      <span className="arvplanos-meta-label">Público-alvo</span>
                      <strong className="arvplanos-meta-value">
                        {activePlan.audience}
                      </strong>
                    </div>
                    <div className="arvplanos-meta-box">
                      <span className="arvplanos-meta-label">Investimento</span>
                      <strong className="arvplanos-meta-value arvplanos-price">
                        {activePlan.price}
                      </strong>
                    </div>
                  </div>

                  {/* Ação (CTA) + Navegação Anterior/Próximo */}
                  <div className="arvplanos-panel-footer">
                    <a
                      href={ctaHref}
                      className="arvplanos-cta-btn ic-interactive"
                      onClick={() => setActivePlanIndex(null)}
                    >
                      <span>{ctaText}</span>
                      <Icon name="arrow-right-duotone" size="sm" />
                    </a>

                    <div className="arvplanos-nav-arrows">
                      <button
                        type="button"
                        className="arvplanos-arrow-btn ic-interactive"
                        onClick={handlePrevPlan}
                        aria-label="Plano anterior"
                      >
                        <Icon name="arrow-left-duotone" size="sm" />
                        <span>Anterior</span>
                      </button>
                      <span className="arvplanos-step-indicator">
                        {activePlanIndex + 1} / {plans.length}
                      </span>
                      <button
                        type="button"
                        className="arvplanos-arrow-btn ic-interactive"
                        onClick={handleNextPlan}
                        aria-label="Próximo plano"
                      >
                        <span>Próximo</span>
                        <Icon name="arrow-right-duotone" size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diferencial & Públicos-Alvo */}
        <div className="solution-details-grid">
          <div className="differential-card reveal">
            <div className="card-kicker">Diferencial Inovador</div>
            <h3>O que torna a Arborização Inteligente um sistema único?</h3>
            <p>
              A <strong>Arborização Inteligente</strong> é a única plataforma que integra <strong>monitoramento em tempo real por sensores IoT</strong>, <strong>inteligência artificial preditiva</strong> e <strong>participação cidadã</strong> para transformar a gestão da arborização urbana em um processo preventivo, inteligente e fundamentado em evidências científicas.
            </p>
            <div className="differential-ods-box">
              <div className="ods-box-header">
                <Icon name="globe-hemisphere-west-duotone" size="sm" />
                <strong>Viabilidade e Conformidade com os ODS da ONU</strong>
              </div>
              <p>
                Resolve o impasse de secretarias de meio ambiente e prefeituras por laudos e relatórios técnicos precisos que respaldam tomadas de decisão, garantindo credibilidade pública e cumprimento das metas dos{' '}
                <a
                  href="https://brasil.un.org/pt-br/sdgs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-source-link"
                  title="Conheça os Objetivos de Desenvolvimento Sustentável da ONU Brasil"
                >
                  <span>Objetivos de Desenvolvimento Sustentável (ODS)</span>
                  <Icon name="arrow-square-out-duotone" size="sm" className="ic-inline-ext" />
                </a>.
              </p>
            </div>
          </div>

          <div className="audience-card reveal">
            <div className="card-kicker">Impacto Multissetorial</div>
            <h3>Público-alvo e Beneficiários</h3>
            <p className="audience-intro">
              Solução projetada para gerar valor prático a diferentes atores da sociedade e da gestão pública:
            </p>
            <div className="audience-segments-grid">
              {AUDIENCE_SEGMENTS.map((seg) => (
                <div key={seg.id} className="audience-segment-item">
                  <div className="segment-top-row">
                    <span className="segment-badge">{seg.badge}</span>
                  </div>
                  <h4>{seg.title}</h4>
                  <p>{seg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

