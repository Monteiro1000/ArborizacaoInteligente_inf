import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/i18nData';

const STORAGE_KEY = 'arbo_lang';
const DEFAULT_LANG = 'pt';

const LanguageContext = createContext(null);

/**
 * Resolve uma chave aninhada (ex: "hero.title") dentro do objeto de idioma
 */
export function resolveKeyPath(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    } catch {
      // Ignora erro de acesso ao localStorage em modo privado restrito
    }
    return DEFAULT_LANG;
  });

  const setLang = useCallback((nextLang) => {
    if (!TRANSLATIONS[nextLang]) return;
    setLangState(nextLang);
    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignora erro de escrita no localStorage
    }
  }, []);

  const dict = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG], [lang]);

  const t = useCallback(
    (keyPath, fallback = '') => {
      const val = resolveKeyPath(dict, keyPath);
      if (val !== undefined) return val;
      const ptVal = resolveKeyPath(TRANSLATIONS[DEFAULT_LANG], keyPath);
      return ptVal !== undefined ? ptVal : fallback || keyPath;
    },
    [dict]
  );

  // Sincroniza atributo lang do <html> e <title> via estado do React
  useEffect(() => {
    const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
    document.documentElement.lang = langMeta.htmlLang;
    document.documentElement.setAttribute('data-lang', lang);

    if (dict.meta?.title) {
      document.title = dict.meta.title;
    }
  }, [lang, dict]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      dict,
      supportedLanguages: SUPPORTED_LANGUAGES
    }),
    [lang, setLang, t, dict]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return ctx;
}
