import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import translations from "../locales/translations";

const STORAGE_KEY = "siteLanguage";
const MIGRATED_KEY = "siteLanguage_migrated";
const LocaleContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "SW";

  // Migration: clear the old default that was auto-saved as "EN"
  // so returning users also see Swahili as the default
  if (!window.localStorage.getItem(MIGRATED_KEY)) {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.setItem(MIGRATED_KEY, "1");
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === "EN" ? "EN" : "SW";
};

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only persist when a migration has been done first
    if (window.localStorage.getItem(MIGRATED_KEY)) {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
    document.documentElement.lang = language === "SW" ? "sw" : "en";
  }, [language]);

  const value = useMemo(() => {
    const current = translations[language] || translations.EN;
    return {
      language,
      setLanguage,
      t: (key, fallback) =>
        current[key] || translations.EN[key] || fallback || key,
    };
  }, [language]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
