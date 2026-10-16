import React, { useState, useEffect, useCallback, useRef } from 'react';
import Hero from './components/Hero';
import ArborizacaoSection from './components/ArborizacaoSection';
import SolutionSection from './components/SolutionSection';
import PartnersSection from './components/PartnersSection';
import TeamSection from './components/TeamSection';
import EventsSection from './components/EventsSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BlogModal from './components/BlogModal';
import Toast from './components/Toast';
import SectionDivider from './components/SectionDivider';
import IconSprite from './components/IconSprite';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { dict } = useLanguage();
  const [activeModalPostId, setActiveModalPostId] = useState(null);
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, duration = 3500) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, isVisible: true });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, duration);
  }, []);

  const handleOpenPost = useCallback((postOrId) => {
    const postId = typeof postOrId === 'string' ? postOrId : postOrId?.id;
    if (!postId) return;
    setActiveModalPostId(postId);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#noticia-${postId}`);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalPostId(null);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
  }, []);

  const handleSharePost = useCallback(
    (post) => {
      if (!post) return;
      const shareUrl = `${window.location.origin}${window.location.pathname}#noticia-${post.id}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => {
            showToast(dict.blog.shareToastSuccess);
          })
          .catch(() => {
            fallbackCopy(shareUrl);
          });
      } else {
        fallbackCopy(shareUrl);
      }

      function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          showToast(dict.blog.shareToastSuccess);
        } catch {
          showToast(dict.blog.shareToastError);
        }
        document.body.removeChild(tempInput);
      }
    },
    [showToast, dict.blog.shareToastSuccess, dict.blog.shareToastError]
  );

  // URL Hash listener for #noticia-:id
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#noticia-')) {
        const postId = hash.replace('#noticia-', '');
        const exists = dict.blog.posts.some((p) => p.id === postId);
        if (exists) {
          const noticiasSection = document.getElementById('noticias');
          noticiasSection?.scrollIntoView({ behavior: 'smooth' });
          setActiveModalPostId(postId);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [dict.blog.posts]);

  // Scroll reveal observer for elements with .reveal class
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal:not(.is-visible)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  return (
    <>
      <Hero />

      <main>
        <SectionDivider
          variant="circuit"
          topColor="var(--bg-azul-1)"
          bottomColor="var(--bg-verde-1)"
        />

        <ArborizacaoSection />

        <SectionDivider
          variant="wave"
          topColor="var(--bg-verde-1)"
          bottomColor="var(--bg-azul-1)"
          flip
        />

        <SolutionSection />
        <PartnersSection />
        <TeamSection />
        <EventsSection />
        <BlogSection onOpenPost={handleOpenPost} />
        <ContactSection onShowToast={showToast} />
      </main>

      <Footer />

      <BlogModal
        postId={activeModalPostId}
        onClose={handleCloseModal}
        onShare={handleSharePost}
      />

      <Toast message={toast.message} isVisible={toast.isVisible} />
      <IconSprite />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
