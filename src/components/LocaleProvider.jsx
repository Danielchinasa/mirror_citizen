import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import translations from "../locales/translations";

const STORAGE_KEY = "siteLanguage";
const LocaleContext = createContext(null);

const SUPPORTED_LANGUAGES = ["FR"];

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "FR";
  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "FR";
};

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = "fr";
  }, [language]);

  const value = useMemo(() => {
    const current = translations[language] || translations.EN;
    return {
      language,
      setLanguage,
      t: (key, fallback) =>
        current[key] || translations.FR[key] || fallback || key,
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
