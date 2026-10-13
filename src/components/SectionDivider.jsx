import React, { useEffect, useRef } from 'react';

/**
 * Componente Reutilizável de Transição entre Seções (.sec-divider)
 * Suporta 3 variações:
 * - 'wave'     : Onda orgânica (curva suave inspirada em copa/folhagem)
 * - 'circuit'  : Circuito (linhas em 45° e 90° com nós circulares, ecoando a logo)
 * - 'gradient' : Gradiente puro (faixa de 160px a 240px de fusão vertical contínua)
 */
export default function SectionDivider({
  variant = 'circuit',
  topColor = 'var(--bg-azul-1)',
  bottomColor = 'var(--bg-verde-1)',
  flip = false
}) {
  const dividerRef = useRef(null);
  const shapeRef = useRef(null);

  // Parallax sutil ao rolar usando apenas transform (translate3d) e IntersectionObserver
  useEffect(() => {
    const dividerEl = dividerRef.current;
    const shapeEl = shapeRef.current;
    if (!dividerEl || !shapeEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let isIntersecting = false;
    let rafId = null;

    const updateParallax = () => {
      if (!isIntersecting) return;
      const rect = dividerEl.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      // Normaliza progresso de -1 a 1 conforme o divisor atravessa a tela
      const progress = (rect.top + rect.height * 0.5 - viewportH * 0.5) / (viewportH * 0.6);
      const clamped = Math.max(-1, Math.min(1, progress));
      const shiftX = (clamped * 14 * (flip ? -1 : 1)).toFixed(2);
      const shiftY = (clamped * 6).toFixed(2);

      shapeEl.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scaleX(1.04)`;
      rafId = null;
    };

    const onScroll = () => {
      if (!isIntersecting || rafId !== null) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            updateParallax();
          }
        });
      },
      { threshold: 0, rootMargin: '80px 0px' }
    );

    observer.observe(dividerEl);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [flip]);

  return (
    <div
      ref={dividerRef}
      className={`sec-divider sec-divider--${variant} ${flip ? 'is-flipped' : ''}`}
      style={{
        '--divider-top': topColor,
        '--divider-bottom': bottomColor
      }}
      aria-hidden="true"
    >
      {variant === 'wave' && (
        <div ref={shapeRef} className="sec-divider__parallax">
          <svg
            className="sec-divider__svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            {/* Camada translúcida de profundidade da folhagem */}
            <path
              className="sec-divider__wave-back"
              d="M0,36 C240,108 480,-12 720,48 C960,108 1200,12 1440,64 L1440,120 L0,120 Z"
            />
            {/* Camada principal conectada sem emenda à seção inferior */}
            <path
              className="sec-divider__fill"
              d="M0,68 C320,118 620,14 960,72 C1180,108 1320,48 1440,82 L1440,120 L0,120 Z"
            />
            {/* Fio luminoso orgânico acompanhando a crista */}
            <path
              className="sec-divider__stroke-accent"
              d="M0,68 C320,118 620,14 960,72 C1180,108 1320,48 1440,82"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}

      {variant === 'circuit' && (
        <div ref={shapeRef} className="sec-divider__parallax">
          <svg
            className="sec-divider__svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            {/* Preenchimento inferior com recortes angulares em 45° e 90° */}
            <path
              className="sec-divider__fill"
              d="M 0,84 L 220,84 L 265,39 L 580,39 L 625,84 L 890,84 L 935,39 L 1210,39 L 1255,84 L 1440,84 L 1440,120 L 0,120 Z"
            />
            {/* Trilha principal de circuito em verde esmeralda / dourado */}
            <path
              className="sec-divider__circuit-line"
              d="M 0,84 L 220,84 L 265,39 L 580,39 L 625,84 L 890,84 L 935,39 L 1210,39 L 1255,84 L 1440,84"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Trilha secundária paralela sutil */}
            <path
              className="sec-divider__circuit-subline"
              d="M 140,102 L 232,102 L 277,57 L 568,57 M 902,102 L 947,57 L 1198,57"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Nós circulares (não distorcem mesmo com preserveAspectRatio="none" no SVG) */}
          <div className="sec-divider__nodes">
            <span className="sec-divider__node is-gold" style={{ left: '18.4%', top: '32.5%' }} />
            <span className="sec-divider__node is-emerald" style={{ left: '40.3%', top: '32.5%' }} />
            <span className="sec-divider__node is-gold" style={{ left: '64.9%', top: '32.5%' }} />
            <span className="sec-divider__node is-emerald" style={{ left: '84.0%', top: '32.5%' }} />
          </div>
        </div>
      )}

      {variant === 'gradient' && (
        <div ref={shapeRef} className="sec-divider__gradient-band" />
      )}
    </div>
  );
}
