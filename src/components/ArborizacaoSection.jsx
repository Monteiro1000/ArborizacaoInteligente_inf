import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_TREE_GEOMETRY, KNOWLEDGE_TREE_DATA, BRANCH_ZOOM_VIEWBOX } from '../data/knowledgeTree';

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
  const [isMobile, setIsMobile] = useState(false);
  const [viewBoxValues, setViewBoxValues] = useState([0, 0, 960, 700]);

  const sectionRef = useRef(null);
  const modalCloseBtnRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  // Detecção de mobile viewport (<= 768px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // Interpolação suave do viewBox para Foco Dinâmico no Mobile
  useEffect(() => {
    const target =
      isMobile && activeBranchId && BRANCH_ZOOM_VIEWBOX[activeBranchId]
        ? BRANCH_ZOOM_VIEWBOX[activeBranchId]
        : BRANCH_ZOOM_VIEWBOX.all;

    if (prefersReducedMotion) {
      setViewBoxValues(target);
      return;
    }

    let startTime = null;
    const start = [...viewBoxValues];
    const duration = 460;
    let animId;

    const step = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Curva suave cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      const next = [
        start[0] + (target[0] - start[0]) * ease,
        start[1] + (target[1] - start[1]) * ease,
        start[2] + (target[2] - start[2]) * ease,
        start[3] + (target[3] - start[3]) * ease
      ];

      setViewBoxValues(next);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [activeBranchId, isMobile, prefersReducedMotion]);

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
          className={`tree-desktop-stage tree-stage-wrapper ${isMobile ? 'is-mobile-view' : ''}`}
          data-active-branch={activeBranchId || 'all'}
          data-is-zoomed={isMobile && activeBranchId ? 'true' : 'false'}
          data-progress-tier={progressPercent > 66 ? 'high' : progressPercent > 33 ? 'mid' : 'low'}
        >
          {/* Barra de Controle de Zoom e Foco no Mobile */}
          {isMobile && (
            <div className="tree-mobile-zoom-bar">
              {activeBranchId ? (
                <>
                  <div className="tree-mobile-zoom-info">
                    <span className="tree-zoom-pulse" aria-hidden="true" />
                    <span className="tree-zoom-text">
                      {content.mobileZoomingIn}{' '}
                      <strong>{content.branches.find((b) => b.id === activeBranchId)?.name}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="tree-zoom-reset-btn ic-interactive"
                    onClick={() => setActiveBranchId(null)}
                    aria-label={content.zoomFullTreeBtn}
                  >
                    <Icon name="arrows-out" size="sm" />
                    <span>{content.zoomFullTreeBtn}</span>
                  </button>
                </>
              ) : (
                <div className="tree-mobile-hint-badge">
                  <Icon name="hand-tap" size="sm" />
                  <span>{content.mobileHintTapBranch}</span>
                </div>
              )}
            </div>
          )}

          <div className="tree-stage-card">
            <svg
              className="tree-svg"
              viewBox={viewBoxValues.map((v) => Math.round(v * 10) / 10).join(' ')}
              role="img"
              aria-label={`${content.sectionTitle} - SVG ilustrado interativo`}
            >
            <defs>
              {/* Sombra suave e sombras realistas sem neon */}
              <filter id="tree-soft-shadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#01140e" floodOpacity="0.45" />
              </filter>

              {/* Brilho botânico suave para folhas ativas e visitadas */}
              <filter id="tree-leaf-glow" x="-35%" y="-35%" width="170%" height="170%">
                <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#34d399" floodOpacity="0.75" />
              </filter>

              {/* Madeira / Casca do Tronco - Volume Cilíndrico Realista */}
              <linearGradient id="tree-bark-cylindrical" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a110a" />
                <stop offset="16%" stopColor="#2e1d13" />
                <stop offset="42%" stopColor="#4a3120" />
                <stop offset="58%" stopColor="#5c3e29" />
                <stop offset="84%" stopColor="#2c1c11" />
                <stop offset="100%" stopColor="#150d07" />
              </linearGradient>

              {/* Gradiente Vertical do Tronco (Da terra escura à copa viva) */}
              <linearGradient id="tree-bark-vert" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#140d07" />
                <stop offset="35%" stopColor="#3b271a" />
                <stop offset="70%" stopColor="#2e2b1c" />
                <stop offset="100%" stopColor="#1f462c" />
              </linearGradient>

              {/* Ramo Principal - Madeira que se estende em galho vivo */}
              <linearGradient id="tree-branch-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#452e1d" />
                <stop offset="45%" stopColor="#293d2b" />
                <stop offset="100%" stopColor="#168048" />
              </linearGradient>

              {/* Ramo Selecionado - Iluminação Vibrante com Acento Esmeralda */}
              <linearGradient id="tree-branch-active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="60%" stopColor="#16be7d" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Feixe de Luz Solar na Copa */}
              <radialGradient id="tree-canopy-sunburst" cx="50%" cy="30%" r="65%">
                <stop offset="0%" stopColor="rgba(74, 222, 128, 0.22)" />
                <stop offset="45%" stopColor="rgba(22, 190, 125, 0.12)" />
                <stop offset="100%" stopColor="rgba(4, 38, 28, 0)" />
              </radialGradient>

              {/* Camadas Orgânicas da Copa de Folhagem com Profundidade */}
              <linearGradient id="tree-foliage-deep" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#031e15" />
                <stop offset="60%" stopColor="#063525" />
                <stop offset="100%" stopColor="#0a4631" />
              </linearGradient>

              <linearGradient id="tree-foliage-mid" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#083e2b" />
                <stop offset="50%" stopColor="#0e5e3f" />
                <stop offset="100%" stopColor="#137f54" />
              </linearGradient>

              <linearGradient id="tree-foliage-sun" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#106843" />
                <stop offset="50%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              {/* Folha Visitada / Explorada (Verde Botânico Luminoso com Nervuras Mint) */}
              <linearGradient id="tree-leaf-visited-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="45%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#0b5c3b" />
              </linearGradient>

              {/* Folha Não Visitada (Vidro Esmeralda Escuro Translúcido com Brilho) */}
              <linearGradient id="tree-leaf-unvisited-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(22, 190, 125, 0.35)" />
                <stop offset="100%" stopColor="rgba(4, 38, 28, 0.95)" />
              </linearGradient>
            </defs>

            {/* 1. AURA DE LUZ SOLAR E COPA BOTÂNICA REALISTA COM PROFUNDIDADE */}
            <g className="tree-canopy-backdrop" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <ellipse cx="480" cy="270" rx="420" ry="250" fill="url(#tree-canopy-sunburst)" />

              {/* Camada 1: Silhueta de folhagem profunda (volume escuro de floresta) */}
              <g className="tree-canopy-silhouette" fill="url(#tree-foliage-deep)" opacity="0.9">
                <circle cx="480" cy="180" r="150" />
                <circle cx="340" cy="220" r="140" />
                <circle cx="620" cy="220" r="140" />
                <circle cx="230" cy="310" r="130" />
                <circle cx="730" cy="310" r="130" />
                <circle cx="210" cy="460" r="120" />
                <circle cx="750" cy="460" r="120" />
                <ellipse cx="480" cy="330" rx="360" ry="180" />
              </g>

              {/* Camada 2: Folhagem média com copas volumétricas */}
              <g className="tree-canopy-mid" fill="url(#tree-foliage-mid)" opacity="0.8">
                <circle cx="480" cy="160" r="125" />
                <circle cx="350" cy="190" r="115" />
                <circle cx="610" cy="190" r="115" />
                <circle cx="250" cy="280" r="110" />
                <circle cx="710" cy="280" r="110" />
                <circle cx="220" cy="430" r="105" />
                <circle cx="740" cy="430" r="105" />
              </g>

              {/* Camada 3: Copas superiores com luz solar dapple */}
              <g className="tree-canopy-sunlit" fill="url(#tree-foliage-sun)" opacity="0.45">
                <circle cx="480" cy="135" r="95" />
                <circle cx="360" cy="170" r="85" />
                <circle cx="600" cy="170" r="85" />
                <circle cx="270" cy="250" r="80" />
                <circle cx="690" cy="250" r="80" />
                <circle cx="240" cy="410" r="75" />
                <circle cx="720" cy="410" r="75" />
              </g>
            </g>

            {/* 2. SOLO NATURAL, MONTÍCULO DE TERRA E RAÍZES PODEROSAS */}
            <g className="tree-ground-group" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              <ellipse cx="480" cy="670" rx="340" ry="24" fill="#031f17" opacity="0.8" />
              <path
                d="M 220 675 Q 480 658 740 675 Q 480 684 220 675 Z"
                fill="#073828"
                opacity="0.85"
              />

              {/* Raízes Sapé / Buttress Roots com Volume */}
              <path
                className="tree-draw-path tree-delay-root"
                d="M 445 610 C 420 635 390 655 350 675 C 335 682 315 686 290 688"
                fill="none"
                stroke="url(#tree-bark-cylindrical)"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                className="tree-draw-path tree-delay-root"
                d="M 430 635 C 405 655 370 670 330 682"
                fill="none"
                stroke="url(#tree-bark-cylindrical)"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                className="tree-draw-path tree-delay-root"
                d="M 515 610 C 540 635 570 655 610 675 C 625 682 645 686 670 688"
                fill="none"
                stroke="url(#tree-bark-cylindrical)"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                className="tree-draw-path tree-delay-root"
                d="M 530 635 C 555 655 590 670 630 682"
                fill="none"
                stroke="url(#tree-bark-cylindrical)"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="100"
              />
              <path
                className="tree-draw-path tree-delay-root"
                d="M 480 640 L 480 690"
                fill="none"
                stroke="url(#tree-bark-cylindrical)"
                strokeWidth="6"
                strokeLinecap="round"
                pathLength="100"
              />

              {/* Tufos de grama na base */}
              <path
                d="M 380 672 Q 385 660 390 672 M 410 674 Q 416 662 422 674 M 540 674 Q 546 662 552 674 M 570 672 Q 575 660 580 672"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* 3. TRONCO ESCULPIDO REALISTA COM CASCA E VOLUME */}
            <g className="tree-trunk-group" aria-hidden="true" style={{ pointerEvents: 'none' }}>
              {/* Corpo Sólido Orgânico do Tronco */}
              <path
                d="M 425 665
                   C 440 640 452 610 456 550
                   C 460 480 460 420 466 360
                   C 470 330 475 315 480 300
                   C 485 315 490 330 494 360
                   C 500 420 500 480 504 550
                   C 508 610 520 640 535 665
                   Z"
                fill="url(#tree-bark-cylindrical)"
                filter="url(#tree-soft-shadow)"
              />

              {/* Estrias e Textura de Casca Realista */}
              <path
                d="M 466 650 C 470 590 472 510 474 420 C 476 370 478 330 479 305"
                fill="none"
                stroke="#5c3e29"
                strokeWidth="1.8"
                opacity="0.6"
                strokeLinecap="round"
              />
              <path
                d="M 494 650 C 490 590 488 510 486 420 C 484 370 482 330 481 305"
                fill="none"
                stroke="#1e130c"
                strokeWidth="2.2"
                opacity="0.65"
                strokeLinecap="round"
              />
              <path
                d="M 480 655 C 480 570 480 460 480 340"
                fill="none"
                stroke="#735036"
                strokeWidth="1.2"
                opacity="0.45"
                strokeLinecap="round"
              />

              {/* Musgo e Pátina Verde no Tronco */}
              <path
                d="M 436 645 C 448 615 455 565 458 505 C 460 470 460 435 463 390"
                fill="none"
                stroke="#16a34a"
                strokeWidth="3.2"
                opacity="0.35"
                strokeLinecap="round"
              />

              {/* Emblema Temático do Tronco */}
              <g className="tree-trunk-badge" transform="translate(480, 530)">
                <rect
                  x="-112"
                  y="-22"
                  width="224"
                  height="44"
                  rx="22"
                  fill="rgba(4, 38, 28, 0.94)"
                  stroke="#16be7d"
                  strokeWidth="1.8"
                  filter="url(#tree-soft-shadow)"
                />
                <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800" letterSpacing="0.06em">
                  {content.trunkTitle.toUpperCase()}
                </text>
                <text x="0" y="13" textAnchor="middle" fill="#34d399" fontSize="9.5" fontWeight="700">
                  {content.trunkSubtitle}
                </text>
              </g>
            </g>

            {/* 4. OS 5 GALHOS ROBUSTOS COM SUAS SUB-RAMIFICAÇÕES E RÓTULOS */}
            {geometry.branches.map((b, idx) => {
              const branchData = content.branches.find((item) => item.id === b.id);
              const isBranchActive = activeBranchId === b.id;
              const isOtherActive = activeBranchId !== null && !isBranchActive;

              return (
                <g
                  key={b.id}
                  className={`tree-branch-group ${isBranchActive ? 'is-active' : ''} ${isOtherActive ? 'is-dimmed' : ''}`}
                >
                  {/* Ramo Principal Visível - Musculoso e Orgânico */}
                  <path
                    className={`tree-draw-path tree-branch-path tree-delay-${idx + 1}`}
                    d={b.branchPath}
                    fill="none"
                    stroke={isBranchActive ? 'url(#tree-branch-active-grad)' : 'url(#tree-branch-grad)'}
                    strokeWidth={isBranchActive ? '9' : '7'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                    filter="url(#tree-soft-shadow)"
                  />
                  {/* Sub-ramificações Visíveis */}
                  <path
                    className={`tree-draw-path tree-branch-sub tree-delay-${idx + 1}`}
                    d={b.subBranch1}
                    fill="none"
                    stroke={isBranchActive ? '#34d399' : '#1e6844'}
                    strokeWidth={isBranchActive ? '5' : '3.8'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />
                  <path
                    className={`tree-draw-path tree-branch-sub tree-delay-${idx + 1}`}
                    d={b.subBranch2}
                    fill="none"
                    stroke={isBranchActive ? '#34d399' : '#1e6844'}
                    strokeWidth={isBranchActive ? '5' : '3.8'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="100"
                  />

                  {/* Caminho Invisível Amplo para Clique Fácil (strokeWidth: 32, pointerEvents: stroke) */}
                  <path
                    className="tree-branch-hitarea"
                    d={`${b.branchPath} ${b.subBranch1} ${b.subBranch2}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="32"
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
                      fill={isBranchActive ? '#16be7d' : 'rgba(4, 38, 28, 0.92)'}
                      stroke={isBranchActive ? '#34d399' : 'rgba(52, 211, 153, 0.45)'}
                      strokeWidth={isBranchActive ? '2.2' : '1.5'}
                      filter="url(#tree-soft-shadow)"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={isBranchActive ? '#04261c' : '#ffffff'}
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

            {/* 5. AS 17 FOLHAS BOTÂNICAS REALISTAS NO DESKTOP */}
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
                  {/* Área de toque acessível ampla para clique e toque perfeitos */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isMobile && activeBranchId ? 36 : 28}
                    fill="#ffffff"
                    opacity="0.001"
                    style={{ pointerEvents: 'all' }}
                  />

                  {/* Conteúdo escalável da folha isolado para evitar conflito com transform do SVG */}
                  <g className="tree-leaf-inner">
                    {/* Halo de foco/seleção */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="28" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeDasharray="4 3" />
                    )}

                    {/* Forma Orgânica Realista da Folha (silhueta botânica natural com curvatura e ápice afilado) */}
                    <path
                      className="tree-leaf-shape"
                      d="M 0 -22 C 16 -16 20 4 0 24 C -20 4 -16 -16 0 -22 Z"
                      fill={isVisited ? 'url(#tree-leaf-visited-grad)' : 'url(#tree-leaf-unvisited-grad)'}
                      stroke={isVisited ? '#86efac' : isBranchActive ? '#4ade80' : '#34d399'}
                      strokeWidth={isSelected ? '2.8' : isBranchActive ? '2.2' : '1.8'}
                      filter={isVisited || isSelected ? 'url(#tree-leaf-glow)' : 'url(#tree-soft-shadow)'}
                    />

                    {/* Pecíolo / Caule da Folha */}
                    <path
                      d="M 0 24 Q 2 28 3 32"
                      fill="none"
                      stroke={isVisited ? '#15803d' : '#1b5a38'}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Nervura Central da Folha (Midrib) */}
                    <path
                      d="M 0 -17 L 0 17"
                      fill="none"
                      stroke={isVisited ? '#dcfce7' : '#34d399'}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.9"
                    />

                    {/* Nervuras Secundárias Laterais */}
                    <path
                      d="M -5 -9 C -2 -7 0 -5 0 -5
                         M 5 -9 C 2 -7 0 -5 0 -5
                         M -7 1 C -3 0 0 4 0 4
                         M 7 1 C 3 0 0 4 0 4
                         M -5 10 C -2 9 0 12 0 12
                         M 5 10 C 2 9 0 12 0 12"
                      fill="none"
                      stroke={isVisited ? '#bbf7d0' : '#22c55e'}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.8"
                    />

                    {/* Rótulo da Folha - Legível, com fundo pill anti-colisão em vidro escuro esmeralda */}
                    <g className="tree-leaf-label-group">
                      <rect
                        className="tree-leaf-label-bg"
                        x={- Math.min(leaf.title.length * 3.8 + 10, 75)}
                        y="24"
                        width={Math.min(leaf.title.length * 7.6 + 20, 150)}
                        height="18"
                        rx="9"
                        fill="rgba(4, 38, 28, 0.92)"
                        stroke={isVisited ? '#4ade80' : isBranchActive ? '#34d399' : 'rgba(52, 211, 153, 0.45)'}
                        strokeWidth={isBranchActive || isSelected ? '1.8' : '1'}
                        filter="url(#tree-soft-shadow)"
                      />
                      <text
                        x="0"
                        y="36.5"
                        textAnchor="middle"
                        className="tree-leaf-label"
                        fill="#f8fafc"
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
          </div>

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
