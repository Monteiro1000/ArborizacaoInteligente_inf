import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_TREE_GEOMETRY, KNOWLEDGE_TREE_DATA } from '../data/knowledgeTree';

const STORAGE_KEY = 'arbo_knowledge_progress';

export default function ArborizacaoSection() {
  const { lang } = useLanguage();
  const currentLang = KNOWLEDGE_TREE_DATA[lang] ? lang : 'pt';
  const content = KNOWLEDGE_TREE_DATA[currentLang];
  const geometry = KNOWLEDGE_TREE_GEOMETRY;

  // Flatten all leaves for navigation and progress calculations
  const allLeaves = useMemo(() => {
    const list = [];
    content.branches.forEach((branch) => {
      branch.leaves.forEach((leaf) => {
        const geoBranch = geometry.branches.find((b) => b.id === branch.id);
        const geoLeaf = geoBranch?.leaves.find((l) => l.id === leaf.id);
        list.push({
          ...leaf,
          branchId: branch.id,
          branchName: branch.name,
          cx: geoLeaf?.cx ?? 480,
          cy: geoLeaf?.cy ?? 360,
          iconType: geoLeaf?.icon ?? 'tree'
        });
      });
    });
    return list;
  }, [content, geometry]);

  const totalLeaves = allLeaves.length;

  // Estado do progresso salvo no localStorage com try/catch
  const [visitedLeaves, setVisitedLeaves] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignora erro em ambientes restritos/privados
    }
    return [];
  });

  const [activeBranchId, setActiveBranchId] = useState(null); // null | branchId
  const [selectedLeafId, setSelectedLeafId] = useState(null); // null | leafId
  const [inView, setInView] = useState(false);
  const [treeGrown, setTreeGrown] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const modalCloseBtnRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // IntersectionObserver com fallback automático para garantir que a árvore nunca fique invisível
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setInView(true);
      setTreeGrown(true);
      return;
    }

    // Fallback de segurança: se o observer demorar mais de 500ms, aciona o crescimento
    const fallbackTimer = setTimeout(() => {
      setInView(true);
      setTreeGrown(true);
    }, 500);

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            setInView(true);
            setTimeout(() => setTreeGrown(true), 120);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Travar o scroll da página enquanto o modal/bottom-sheet estiver aberto
  useEffect(() => {
    if (selectedLeafId) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedLeafId]);

  // Persistir progresso no localStorage
  const markLeafVisited = useCallback((leafId) => {
    setVisitedLeaves((prev) => {
      if (prev.includes(leafId)) return prev;
      const updated = [...prev, leafId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignora erro de cota ou modo privado
      }
      return updated;
    });
  }, []);

  // Selecionar folha
  const handleSelectLeaf = useCallback(
    (leafId, isModalNav = false) => {
      if (!isModalNav) {
        lastFocusedElementRef.current = document.activeElement;
      }
      setSelectedLeafId(leafId);
      markLeafVisited(leafId);

      const leaf = allLeaves.find((l) => l.id === leafId);
      if (leaf) {
        setLiveAnnouncement(`${leaf.title} - ${leaf.branchName}. ${leaf.text}`);
      }

      if (!isModalNav) {
        setTimeout(() => {
          modalCloseBtnRef.current?.focus();
        }, 80);
      }
    },
    [allLeaves, markLeafVisited]
  );

  // Fechar detalhes da folha
  const handleCloseLeafModal = useCallback(() => {
    setSelectedLeafId(null);
    if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
      lastFocusedElementRef.current.focus();
    }
  }, []);

  // Navegar entre folhas dentro do popover/modal
  const handlePrevLeaf = useCallback(() => {
    if (!selectedLeafId) return;
    const currentIndex = allLeaves.findIndex((l) => l.id === selectedLeafId);
    const prevIndex = (currentIndex - 1 + allLeaves.length) % allLeaves.length;
    handleSelectLeaf(allLeaves[prevIndex].id, true);
  }, [allLeaves, selectedLeafId, handleSelectLeaf]);

  const handleNextLeaf = useCallback(() => {
    if (!selectedLeafId) return;
    const currentIndex = allLeaves.findIndex((l) => l.id === selectedLeafId);
    const nextIndex = (currentIndex + 1) % allLeaves.length;
    handleSelectLeaf(allLeaves[nextIndex].id, true);
  }, [allLeaves, selectedLeafId, handleSelectLeaf]);

  // Resetar progresso
  const handleResetProgress = useCallback(() => {
    setVisitedLeaves([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignora erro
    }
    setSelectedLeafId(null);
    setLiveAnnouncement(`${content.progressExplored} 0 ${content.progressOf} ${totalLeaves}`);
  }, [content, totalLeaves]);

  // Teclado: Fechar modal ao pressionar ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && selectedLeafId) {
        handleCloseLeafModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedLeafId, handleCloseLeafModal]);

  // Folha atualmente aberta
  const selectedLeaf = useMemo(() => {
    return allLeaves.find((l) => l.id === selectedLeafId) || null;
  }, [allLeaves, selectedLeafId]);

  // Métricas de progresso
  const exploredCount = visitedLeaves.length;
  const progressPercent = Math.min(100, Math.round((exploredCount / totalLeaves) * 100));
  const isComplete = exploredCount === totalLeaves;

  // Galhos filtrados para a visão mobile
  const visibleBranches = useMemo(() => {
    if (!activeBranchId) return content.branches;
    return content.branches.filter((b) => b.id === activeBranchId);
  }, [content.branches, activeBranchId]);

  return (
    <section
      ref={sectionRef}
      className="arb-section tree-section"
      id="arborizacao"
      data-in-view={inView ? 'true' : 'false'}
      data-tree-grown={treeGrown ? 'true' : 'false'}
      aria-labelledby="tree-section-title"
    >
      {/* Região aria-live para acessibilidade */}
      <div className="tree-sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      <div className="container">
        {/* Cabeçalho da Seção */}
        <header className="tree-header text-center">
          <span className="tree-eyebrow" data-i18n="arborizacao.eyebrow">
            {content.sectionEyebrow}
          </span>
          <h2 id="tree-section-title" className="tree-title" data-i18n="arborizacao.title">
            {content.sectionTitle}
          </h2>
          <p className="tree-subtitle" data-i18n="arborizacao.subtitle">
            {content.sectionSubtitle}
          </p>
        </header>

        {/* Barra de Progresso e Controle */}
        <div className="tree-progress-card">
          <div className="tree-progress-info">
            <span className="tree-progress-label">
              <Icon name="sparkle" size="sm" className="tree-progress-sparkle" />
              <strong>{content.progressExplored}</strong>{' '}
              <span className="tree-progress-count">
                {exploredCount} {content.progressOf} {totalLeaves} {content.progressLeaves}
              </span>{' '}
              ({progressPercent}%)
            </span>

            <button
              type="button"
              className="tree-reset-btn ic-interactive"
              onClick={handleResetProgress}
              aria-label={content.restartAria}
              title={content.restartAria}
            >
              <Icon name="arrows-clockwise" size="sm" />
              <span>{content.restartBtn}</span>
            </button>
          </div>

          <div
            className="tree-progress-track"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={content.progressTitle}
          >
            <div className="tree-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          {isComplete && (
            <div className="tree-complete-banner" role="status">
              <Icon name="check-circle" size="md" className="tree-complete-icon" />
              <span>{content.progressCompleteMsg}</span>
            </div>
          )}
        </div>

        {/* Filtro / Navegador Rápido de Galhos (Acessível em Desktop e Mobile) */}
        <div className="tree-branch-filter" role="tablist" aria-label="Filtrar galhos da árvore">
          <button
            type="button"
            className={`tree-filter-pill ${activeBranchId === null ? 'active' : ''}`}
            onClick={() => setActiveBranchId(null)}
          >
            {content.branchSelectorAll}
          </button>
          {content.branches.map((b, idx) => {
            const isActive = activeBranchId === b.id;
            const branchLeaves = allLeaves.filter((l) => l.branchId === b.id);
            const branchVisitedCount = branchLeaves.filter((l) => visitedLeaves.includes(l.id)).length;
            return (
              <button
                key={b.id}
                type="button"
                className={`tree-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveBranchId(isActive ? null : b.id)}
              >
                <span className="tree-filter-num">0{idx + 1}</span>
                <span>{b.name}</span>
                <span className="tree-filter-badge">
                  {branchVisitedCount}/{branchLeaves.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            1. VISUALIZAÇÃO DESKTOP: ÁRVORE ILUSTRADA EM SVG (.tree-desktop-stage)
            Árvore horizontalmente centralizada com galhos abrindo para os lados
            ================================================================= */}
        <div
          className="tree-desktop-stage"
          data-active-branch={activeBranchId || 'all'}
          data-progress-tier={progressPercent > 66 ? 'high' : progressPercent > 33 ? 'mid' : 'low'}
        >
          <svg
            className="tree-svg"
            viewBox="0 0 960 700"
            role="img"
            aria-label={`${content.sectionTitle} - SVG ilustrado interativo`}
          >
            <defs>
              {/* Gradiente do Tronco */}
              <linearGradient id="tree-trunk-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#02183f" />
                <stop offset="50%" stopColor="#061e73" />
                <stop offset="100%" stopColor="#105ca2" />
              </linearGradient>

              {/* Gradiente dos Galhos Primários */}
              <linearGradient id="tree-branch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#061e73" />
                <stop offset="60%" stopColor="#105ca2" />
                <stop offset="100%" stopColor="#12b674" />
              </linearGradient>

              {/* Gradiente das Folhas Ativas/Visitadas */}
              <linearGradient id="tree-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#12b674" />
                <stop offset="100%" stopColor="#0b5c3b" />
              </linearGradient>

              {/* Sombra suave sem neon */}
              <filter id="tree-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#02183f" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Aura de Folhagem Suave no Fundo (Copa Arbórea) */}
            <g className="tree-canopy-backdrop" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <ellipse cx="480" cy="310" rx="360" ry="240" fill="rgba(18, 182, 116, 0.08)" />
              <circle cx="320" cy="280" r="140" fill="rgba(16, 92, 162, 0.05)" />
              <circle cx="640" cy="280" r="140" fill="rgba(16, 92, 162, 0.05)" />
              <circle cx="480" cy="180" r="160" fill="rgba(18, 182, 116, 0.07)" />
            </g>

            {/* LINHA DO SOLO E RAÍZES */}
            <g className="tree-ground-group" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <line x1="260" y1="660" x2="700" y2="660" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
              <path
                className="tree-draw-path tree-delay-root"
                d={geometry.trunk.rootsPath}
                fill="none"
                stroke="#02183f"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="100"
              />
            </g>

            {/* TRONCO CENTRAL */}
            <g className="tree-trunk-group" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <path
                className="tree-draw-path tree-trunk-main"
                d={geometry.trunk.path}
                fill="none"
                stroke="url(#tree-trunk-grad)"
                strokeWidth="20"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                className="tree-draw-path tree-trunk-inner"
                d={geometry.trunk.path}
                fill="none"
                stroke="#12b674"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.75"
                pathLength="100"
              />

              {/* Emblema Temático do Tronco */}
              <g className="tree-trunk-badge" transform="translate(480, 530)">
                <rect
                  x="-110"
                  y="-22"
                  width="220"
                  height="44"
                  rx="22"
                  fill="#ffffff"
                  stroke="#105ca2"
                  strokeWidth="2"
                  filter="url(#tree-soft-shadow)"
                />
                <text x="0" y="-3" textAnchor="middle" fill="#02183f" fontSize="12" fontWeight="800" letterSpacing="0.06em">
                  {content.trunkTitle.toUpperCase()}
                </text>
                <text x="0" y="13" textAnchor="middle" fill="#12b674" fontSize="9.5" fontWeight="700">
                  {content.trunkSubtitle}
                </text>
              </g>
            </g>

            {/* OS 5 GALHOS COM SUAS SUB-RAMIFICAÇÕES E RÓTULOS */}
            {geometry.branches.map((b, idx) => {
              const branchData = content.branches.find((item) => item.id === b.id);
              const isBranchActive = activeBranchId === b.id;
              const isOtherActive = activeBranchId !== null && !isBranchActive;

              return (
                <g
                  key={b.id}
                  className={`tree-branch-group ${isBranchActive ? 'is-active' : ''} ${isOtherActive ? 'is-dimmed' : ''}`}
                >
                  {/* Ramo Principal Visível */}
                  <path
                    className={`tree-draw-path tree-branch-path tree-delay-${idx + 1}`}
                    d={b.branchPath}
                    fill="none"
                    stroke={isBranchActive ? '#12b674' : 'url(#tree-branch-grad)'}
                    strokeWidth={isBranchActive ? '7' : '5'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  {/* Sub-ramificações Visíveis */}
                  <path
                    className={`tree-draw-path tree-branch-sub tree-delay-${idx + 1}`}
                    d={b.subBranch1}
                    fill="none"
                    stroke={isBranchActive ? '#12b674' : '#105ca2'}
                    strokeWidth={isBranchActive ? '4.2' : '3.2'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <path
                    className={`tree-draw-path tree-branch-sub tree-delay-${idx + 1}`}
                    d={b.subBranch2}
                    fill="none"
                    stroke={isBranchActive ? '#12b674' : '#105ca2'}
                    strokeWidth={isBranchActive ? '4.2' : '3.2'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />

                  {/* Caminho Invisível Amplo para Clique Fácil (strokeWidth: 28, pointerEvents: stroke) */}
                  <path
                    className="tree-branch-hitarea"
                    d={`${b.branchPath} ${b.subBranch1} ${b.subBranch2}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
                    onClick={() => setActiveBranchId((prev) => (prev === b.id ? null : b.id))}
                    aria-label={`Galho ${idx + 1}: ${branchData?.name}`}
                  />

                  {/* Rótulo / Botão Interativo do Galho no SVG */}
                  <g
                    className="tree-branch-tag"
                    transform={`translate(${b.badgeX}, ${b.badgeY})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Galho ${idx + 1}: ${branchData?.name}`}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBranchId((prev) => (prev === b.id ? null : b.id));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveBranchId((prev) => (prev === b.id ? null : b.id));
                      }
                    }}
                  >
                    <rect
                      x="-70"
                      y="-14"
                      width="140"
                      height="28"
                      rx="14"
                      fill={isBranchActive ? '#02183f' : '#ffffff'}
                      stroke={isBranchActive ? '#12b674' : '#105ca2'}
                      strokeWidth={isBranchActive ? '2.2' : '1.6'}
                      filter="url(#tree-soft-shadow)"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={isBranchActive ? '#ffffff' : '#02183f'}
                      fontSize="10.5"
                      fontWeight="700"
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {branchData?.name}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* AS 17 FOLHAS / NÓS INTERATIVOS NO DESKTOP */}
            {allLeaves.map((leaf) => {
              const isVisited = visitedLeaves.includes(leaf.id);
              const isSelected = selectedLeafId === leaf.id;
              const isBranchActive = activeBranchId === leaf.branchId;
              const isOtherBranch = activeBranchId !== null && !isBranchActive;

              return (
                <g
                  key={leaf.id}
                  className={`tree-leaf-node ${isVisited ? 'is-visited' : 'is-unvisited'} ${isSelected ? 'is-selected' : ''} ${isBranchActive ? 'is-branch-active' : ''} ${isOtherBranch ? 'is-dimmed' : ''}`}
                  transform={`translate(${leaf.cx}, ${leaf.cy})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${leaf.title} (${leaf.branchName}) - ${isVisited ? content.leafExploredBadge : content.leafNewBadge}`}
                  style={{ cursor: 'pointer', pointerEvents: 'all' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLeaf(leaf.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectLeaf(leaf.id);
                    }
                  }}
                >
                  {/* Área de toque acessível ampla (56px) para clique perfeito */}
                  <circle cx="0" cy="0" r="28" fill="#ffffff" opacity="0.001" style={{ pointerEvents: 'all' }} />

                  {/* Conteúdo escalável da folha isolado para evitar conflito com transform do SVG */}
                  <g className="tree-leaf-inner">
                    {/* Halo de foco/seleção */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="24" fill="none" stroke="#12b674" strokeWidth="2.5" strokeDasharray="4 3" />
                    )}

                    {/* Forma da Folha com Sombreamento Suave */}
                    <path
                      className="tree-leaf-shape"
                      d="M 0 -17 C 12 -12 17 0 0 17 C -17 0 -12 -12 0 -17 Z"
                      fill={isVisited ? 'url(#tree-leaf-grad)' : '#ffffff'}
                      stroke={isVisited ? '#0b5c3b' : isBranchActive ? '#12b674' : '#105ca2'}
                      strokeWidth={isSelected ? '2.5' : isBranchActive ? '2.2' : '1.8'}
                      filter="url(#tree-soft-shadow)"
                    />

                    {/* Nervura da Folha ou Ícone de Visitada */}
                    {isVisited ? (
                      <path d="M 0 -10 L 0 10 M -4 -3 L 0 0 M 4 -3 L 0 0" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                    ) : (
                      <circle cx="0" cy="0" r="3.2" fill={isBranchActive ? '#12b674' : '#105ca2'} />
                    )}

                    {/* Rótulo da Folha - Legível, com fundo pill anti-colisão */}
                    <g className="tree-leaf-label-group">
                      <rect
                        className="tree-leaf-label-bg"
                        x={- Math.min(leaf.title.length * 3.8 + 10, 75)}
                        y="21"
                        width={Math.min(leaf.title.length * 7.6 + 20, 150)}
                        height="18"
                        rx="9"
                        fill="#ffffff"
                        stroke={isVisited ? '#12b674' : '#cbd5e1'}
                        strokeWidth="1"
                        filter="url(#tree-soft-shadow)"
                      />
                      <text
                        x="0"
                        y="33.5"
                        textAnchor="middle"
                        className="tree-leaf-label"
                        fill={isVisited ? '#0b5c3b' : '#1e293b'}
                        fontSize="9"
                        fontWeight="700"
                        style={{ userSelect: 'none', pointerEvents: 'none' }}
                      >
                        {leaf.title.length > 20 ? leaf.title.slice(0, 18) + '…' : leaf.title}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Dica de interação Desktop */}
          <p className="tree-hint-text">
            <Icon name="magnifying-glass" size="sm" className="tree-hint-icon" />
            <span>{content.hintText}</span>
          </p>
        </div>

        {/* =================================================================
            2. VISUALIZAÇÃO MOBILE: LAYOUT VERTICAL DA ÁRVORE (.tree-mobile-flow)
            Layout vertical otimizado para toque (mínimo 44px), sem scroll horizontal
            ================================================================= */}
        <div className="tree-mobile-flow">
          <div className="tree-mobile-stem" aria-hidden="true" />

          {visibleBranches.map((branch, bIdx) => {
            const branchLeaves = allLeaves.filter((l) => l.branchId === branch.id);
            const branchVisitedCount = branchLeaves.filter((l) => visitedLeaves.includes(l.id)).length;
            const isBranchDone = branchVisitedCount === branchLeaves.length;

            return (
              <div key={branch.id} className="tree-mobile-branch-card">
                <div className="tree-mobile-branch-header">
                  <div className="tree-mobile-branch-tag">
                    <span className="tree-mobile-branch-num">0{bIdx + 1}</span>
                    <h3 className="tree-mobile-branch-title">{branch.name}</h3>
                  </div>
                  <span className={`tree-mobile-branch-badge ${isBranchDone ? 'is-complete' : ''}`}>
                    {branchVisitedCount} / {branchLeaves.length}
                  </span>
                </div>
                <p className="tree-mobile-branch-desc">{branch.shortDesc}</p>

                <div className="tree-mobile-leaves-grid" role="list">
                  {branchLeaves.map((leaf) => {
                    const isVisited = visitedLeaves.includes(leaf.id);
                    const isSelected = selectedLeafId === leaf.id;

                    return (
                      <button
                        key={leaf.id}
                        type="button"
                        role="listitem"
                        className={`tree-mobile-leaf-btn ic-interactive ${isVisited ? 'is-visited' : ''} ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelectLeaf(leaf.id)}
                        aria-label={`${leaf.title} (${branch.name}) - ${isVisited ? content.leafExploredBadge : content.leafNewBadge}`}
                      >
                        <span className="tree-mobile-leaf-icon" aria-hidden="true">
                          {isVisited ? (
                            <Icon name="check-circle" size="sm" />
                          ) : (
                            <span className="tree-mobile-leaf-dot" />
                          )}
                        </span>

                        <span className="tree-mobile-leaf-title">{leaf.title}</span>

                        <span className="tree-mobile-leaf-status">
                          {isVisited ? content.leafExploredBadge : content.leafNewBadge}
                        </span>

                        <Icon name="arrow-right" size="sm" className="tree-mobile-leaf-arrow" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================================
            POPOVER ANCORADO (DESKTOP) / BOTTOM SHEET (MOBILE)
            ================================================================= */}
        {selectedLeaf && (
          <>
            <div className="tree-modal-backdrop" onClick={handleCloseLeafModal} aria-hidden="true" />

            <div
              className="tree-leaf-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tree-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tree-modal-header">
                <div className="tree-modal-badges">
                  <span className="tree-badge-branch">{selectedLeaf.branchName}</span>
                  <span className={`tree-badge-status ${visitedLeaves.includes(selectedLeaf.id) ? 'is-visited' : ''}`}>
                    {visitedLeaves.includes(selectedLeaf.id) ? (
                      <>
                        <Icon name="check-circle" size="sm" />
                        <span>{content.leafExploredBadge}</span>
                      </>
                    ) : (
                      <span>{content.leafNewBadge}</span>
                    )}
                  </span>
                  {selectedLeaf.isTodo && <span className="tree-badge-todo">{content.todoTag}</span>}
                </div>

                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  className="tree-modal-close-btn ic-btn ic-interactive"
                  onClick={handleCloseLeafModal}
                  aria-label={content.closeModalAria}
                >
                  <Icon name="x" size="md" />
                </button>
              </div>

              <div className="tree-modal-body">
                <h3 id="tree-modal-title" className="tree-modal-title">
                  {selectedLeaf.title}
                </h3>
                <p className="tree-modal-desc">{selectedLeaf.text}</p>

                {selectedLeaf.curiosity && (
                  <div className="tree-curiosity-box">
                    <div className="tree-curiosity-header">
                      <Icon name="sparkle" size="sm" className="tree-curiosity-icon" />
                      <strong>{content.curiosityBadge}</strong>
                    </div>
                    <p className="tree-curiosity-text">{selectedLeaf.curiosity}</p>
                    {selectedLeaf.sourceLabel && (
                      <p className="tree-source-line">
                        <span className="tree-source-lbl">{content.sourceLabel}</span>{' '}
                        {selectedLeaf.sourceUrl ? (
                          <a
                            href={selectedLeaf.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tree-source-link"
                          >
                            <span>{selectedLeaf.sourceLabel}</span>
                            <Icon name="arrow-square-out" size="sm" className="ic-inline-ext" />
                          </a>
                        ) : (
                          <span className="tree-source-name">{selectedLeaf.sourceLabel}</span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="tree-modal-footer">
                <div className="tree-modal-nav">
                  <button type="button" className="tree-nav-btn ic-interactive" onClick={handlePrevLeaf}>
                    <Icon name="arrow-left" size="sm" />
                    <span>{content.prevLeafBtn}</span>
                  </button>

                  <span className="tree-step-indicator">
                    {allLeaves.findIndex((l) => l.id === selectedLeaf.id) + 1} / {totalLeaves}
                  </span>

                  <button type="button" className="tree-nav-btn ic-interactive" onClick={handleNextLeaf}>
                    <span>{content.nextLeafBtn}</span>
                    <Icon name="arrow-right" size="sm" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
