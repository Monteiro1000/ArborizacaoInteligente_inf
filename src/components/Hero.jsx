import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import { useLanguage } from '../context/LanguageContext';

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 42;

const HERO_SLIDES = [
  {
    id: 'slide-1',
    src: '/assets/img/hero-1.jpg',
    fallbackSrc: 'assets/equipe.jpg',
    titleKey: 'hero.slides.slide1.title',
    descKey: 'hero.slides.slide1.desc',
    altKey: 'hero.slides.slide1.alt'
  },
  {
    id: 'slide-2',
    src: '/assets/img/hero-2.jpg',
    fallbackSrc: 'assets/arborizacao-bg.jpg',
    titleKey: 'hero.slides.slide2.title',
    descKey: 'hero.slides.slide2.desc',
    altKey: 'hero.slides.slide2.alt'
  },
  {
    id: 'slide-3',
    src: '/assets/img/hero-3.jpg',
    fallbackSrc: 'assets/eventos/mini-cop.jpg',
    titleKey: 'hero.slides.slide3.title',
    descKey: 'hero.slides.slide3.desc',
    altKey: 'hero.slides.slide3.alt'
  }
];

export default function Hero() {
  const { t, dict } = useLanguage();
  const totalSlides = HERO_SLIDES.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  // Detecta prefers-reduced-motion para respeitar acessibilidade de movimento
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay a cada ~5s (desativado se prefers-reduced-motion estiver ativo ou em pausa)
  useEffect(() => {
    if (isPaused || prefersReducedMotion || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, nextSlide, totalSlides]);

  // Suporte a swipe no celular
  const handleTouchStart = (e) => {
    setIsPaused(true);
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchDeltaXRef.current = 0;
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartXRef.current === null || !e.touches || e.touches.length === 0) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null) {
      if (touchDeltaXRef.current <= -SWIPE_THRESHOLD_PX) {
        nextSlide();
      } else if (touchDeltaXRef.current >= SWIPE_THRESHOLD_PX) {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsPaused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide] || HERO_SLIDES[0];

  return (
    <header
      className="site-header"
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <Navbar />

      {/* CARROSSEL DO HEADER: 3 imagens deslizando horizontalmente com transform */}
      <div
        className="hero-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={dict.hero.carousel.regionAria}
        data-i18n-aria-label="hero.carousel.regionAria"
      >
        <div
          className="hero-carousel-track"
          style={{
            transform: `translate3d(-${currentSlide * 100}%, 0, 0)`
          }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-carousel-slide ${idx === currentSlide ? 'is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} / ${totalSlides}`}
              aria-hidden={idx !== currentSlide}
            >
              <img
                src={slide.src}
                alt={t(slide.altKey)}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                decoding="async"
                onError={(e) => {
                  if (slide.fallbackSrc && !e.currentTarget.dataset.fallbackApplied) {
                    e.currentTarget.dataset.fallbackApplied = 'true';
                    e.currentTarget.src = slide.fallbackSrc;
                  }
                }}
              />
            </div>
          ))}
        </div>
        <div className="hero-carousel-overlay" aria-hidden="true" />
      </div>

      <div className="hero container">
        <div className="hero-copy">
          <div className="hero-badges-row">
            <span className="hero-status-pill" data-i18n="hero.statusPill">
              {dict.hero.statusPill}
            </span>

            <span className="hero-launch-badge" data-i18n="hero.comingSoonPill">
              {dict.hero.comingSoonPill}
            </span>
          </div>

          <div key={activeSlide.id} className="hero-slide-copy" aria-live="polite">
            <h1 className="hero-title" data-i18n={activeSlide.titleKey}>
              {t(activeSlide.titleKey)}
            </h1>
            <p className="lead hero-slide-desc" data-i18n={activeSlide.descKey}>
              {t(activeSlide.descKey)}
            </p>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-metric-item">
              <span className="metric-val" data-i18n="hero.metrics.iotVal">
                {dict.hero.metrics.iotVal}
              </span>
              <span className="metric-lbl" data-i18n="hero.metrics.iotLbl">
                {dict.hero.metrics.iotLbl}
              </span>
            </div>
            <div className="hero-metric-item">
              <span className="metric-val" data-i18n="hero.metrics.aiVal">
                {dict.hero.metrics.aiVal}
              </span>
              <span className="metric-lbl" data-i18n="hero.metrics.aiLbl">
                {dict.hero.metrics.aiLbl}
              </span>
            </div>
            <div className="hero-metric-item">
              <span className="metric-val" data-i18n="hero.metrics.odsVal">
                {dict.hero.metrics.odsVal}
              </span>
              <span className="metric-lbl" data-i18n="hero.metrics.odsLbl">
                {dict.hero.metrics.odsLbl}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INDICADORES (DOTS CLICÁVEIS) DO CARROSSEL */}
      <div className="hero-carousel-controls container">
        <div className="hero-carousel-dots" role="tablist" aria-label={dict.hero.carousel.regionAria}>
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                className={`hero-carousel-dot ${isActive ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`${dict.hero.carousel.dotAriaPrefix} ${idx + 1}: ${t(slide.titleKey)}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                <span className="hero-carousel-dot-bar" />
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
