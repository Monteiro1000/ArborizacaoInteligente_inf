import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from './IconSprite';
import { useLanguage } from '../context/LanguageContext';

/**
 * TAREFA 7: SEÇÃO DESTAQUES DO PROJETO OTIMIZADA PARA 60FPS
 * - Substitui listener de scroll síncrono por IntersectionObserver (zero layout thrashing)
 * - Autoplay pausado fora da viewport, em hover/toque e com prefers-reduced-motion
 * - Indicadores animam apenas transform/opacity com área de toque mínima de 44x44px
 */
export default function EventsSection() {
  const { dict } = useLanguage();
  const eventsDict = dict.events;
  const eventsList = eventsDict.items;
  const totalSlides = eventsList.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Respeita prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e) => setPrefersReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
  }, []);

  // 1. IntersectionObserver da seção: pausa o autoplay quando fora da tela
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || !('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    sectionObserver.observe(sectionEl);
    return () => sectionObserver.disconnect();
  }, []);

  // 2. IntersectionObserver dos slides: sincroniza o indicador sem evento de scroll
  useEffect(() => {
    const carouselEl = carouselRef.current;
    if (!carouselEl || !('IntersectionObserver' in window)) return;

    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = Number(entry.target.getAttribute('data-slide-index'));
            if (!Number.isNaN(idx)) {
              setCurrentIndex(idx);
            }
          }
        });
      },
      {
        root: carouselEl,
        threshold: [0.55, 0.75]
      }
    );

    slideRefs.current.forEach((slideEl) => {
      if (slideEl) slideObserver.observe(slideEl);
    });

    return () => slideObserver.disconnect();
  }, [totalSlides]);

  const scrollToSlide = useCallback(
    (index) => {
      const targetIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrentIndex(targetIndex);
      currentIndexRef.current = targetIndex;

      const carousel = carouselRef.current;
      const targetSlide = slideRefs.current[targetIndex];
      if (!carousel || !targetSlide) return;

      // Calcula posição usando getBoundingClientRect uma única vez na ação de clique/timer
      const carouselRect = carousel.getBoundingClientRect();
      const slideRect = targetSlide.getBoundingClientRect();
      const targetLeft = carousel.scrollLeft + (slideRect.left - carouselRect.left);

      carousel.scrollTo({
        left: targetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    },
    [prefersReducedMotion, totalSlides]
  );

  const nextSlide = useCallback(() => {
    scrollToSlide(currentIndexRef.current + 1);
  }, [scrollToSlide]);

  const prevSlide = useCallback(() => {
    scrollToSlide(currentIndexRef.current - 1);
  }, [scrollToSlide]);

  // Autoplay estável (não recria o timer a cada evento de scroll)
  useEffect(() => {
    if (isPaused || !isInViewport || prefersReducedMotion || totalSlides <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      scrollToSlide(currentIndexRef.current + 1);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [isPaused, isInViewport, prefersReducedMotion, scrollToSlide, totalSlides]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section className="events-section" id="eventos" ref={sectionRef}>
      <div className="container">
        <div className="events-header text-center">
          <p className="eyebrow eyebrow-dark" data-i18n="events.eyebrow">
            {eventsDict.eyebrow}
          </p>
          <h2 data-i18n="events.title">{eventsDict.title}</h2>
          <p className="section-text" data-i18n="events.subtitle">
            {eventsDict.subtitle}
          </p>
        </div>

        {/* Carrossel de Eventos em Destaque */}
        <div
          className="events-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="events-nav-btn prev ic-btn"
            id="eventPrev"
            aria-label={eventsDict.prevAria}
            data-i18n-aria-label="events.prevAria"
            onClick={prevSlide}
          >
            <Icon name="arrow-left-duotone" size="md" />
          </button>

          <div
            className="events-carousel"
            id="eventsCarousel"
            ref={carouselRef}
            tabIndex={0}
            role="region"
            aria-label={eventsDict.carouselAria}
            data-i18n-aria-label="events.carouselAria"
            onKeyDown={handleKeyDown}
          >
            {eventsList.map((event, idx) => (
              <div
                key={event.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                data-slide-index={idx}
                className="event-slide"
              >
                <article className="event-card-inner">
                  <div className="event-image-box">
                    <span className={`event-status-pill ${event.statusType || 'past'}`}>
                      {event.statusPill}
                    </span>
                    <img
                      src={event.image}
                      alt={event.alt}
                      width="600"
                      height="338"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="event-body-box">
                    <span className="event-date-tag">{event.dateTag}</span>
                    <h3>{event.title}</h3>
                    <p className="event-desc">{event.desc}</p>
                    <div className="event-meta-footer">
                      <span className="event-highlight-tag">
                        <Icon
                          name={event.highlightIcon || 'medal-duotone'}
                          size="sm"
                          className="ic-inline"
                        />
                        <span>{event.highlightTag}</span>
                      </span>
                      <span className="event-attendees-tag">{event.attendeesTag}</span>
                    </div>
                    {event.sourceUrl && (
                      <div className="event-source-row">
                        <a
                          href={event.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-source-link"
                          title={event.sourceOrg}
                        >
                          <span>
                            {eventsDict.sourcePrefix} {event.sourceOrg}
                          </span>
                          <Icon
                            name="arrow-square-out-duotone"
                            size="sm"
                            className="ic-inline-ext"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="events-nav-btn next ic-btn"
            id="eventNext"
            aria-label={eventsDict.nextAria}
            data-i18n-aria-label="events.nextAria"
            onClick={nextSlide}
          >
            <Icon name="arrow-right-duotone" size="md" />
          </button>
        </div>

        {/* Indicadores do Carrossel de Eventos (Alvo de toque >= 44x44px, animação apenas em transform/opacity) */}
        <div className="events-carousel-indicators" id="eventsIndicators">
          {eventsList.map((ev, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={ev.id}
                type="button"
                className={`event-indicator ${isActive ? 'active' : ''}`}
                aria-label={`${eventsDict.dotAriaPrefix} ${idx + 1}: ${ev.title}`}
                aria-current={isActive ? 'true' : 'false'}
                onClick={() => scrollToSlide(idx)}
              >
                <span className="event-indicator-pill" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
