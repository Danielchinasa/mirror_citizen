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
  if (typeof window === "undefined") return "EN";

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return storedLanguage === "SW" ? "SW" : "EN";
};

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "SW" ? "sw" : "en";
  }, [language]);

  const value = useMemo(() => {
    const current = translations[language] || translations.EN;
    return {
      language,
      setLanguage,
      t: (key, params) => {
        const raw =
          current[key] || translations.EN[key] || key;
        if (!params) return raw;
        return raw.replace(/\{(\w+)\}/g, (_, k) =>
          params[k] !== undefined ? params[k] : `{${k}}`,
        );
      },
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
