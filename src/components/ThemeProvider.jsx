import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { lightTheme, darkTheme } from "../theme/themeConfig";

const ThemeContext = createContext();

const cssVarsLight = {
  "--ec-bg": "#ffffff",
  "--ec-bg-secondary": "#f9fafb",
  "--ec-bg-tertiary": "#fffbe6",
  "--ec-bg-card": "#ffffff",
  "--ec-bg-card-alt": "#fffbe6",
  "--ec-bg-input": "#ffffff",
  "--ec-text": "#1a1a1a",
  "--ec-text-secondary": "#555",
  "--ec-text-muted": "#777",
  "--ec-text-faint": "#999",
  "--ec-heading": "#354138",
  "--ec-primary": "#FBCB19",
  "--ec-primary-hover": "#D4A800",
  "--ec-primary-bg": "#FFF9CC",
  "--ec-primary-dark": "#FBCB19",
  "--ec-border": "#e5e7eb",
  "--ec-border-light": "#f0f0f0",
  "--ec-shadow": "rgba(0, 0, 0, 0.06)",
  "--ec-card-hover-shadow": "rgba(0, 0, 0, 0.08)",
  "--ec-hero-gradient":
    "linear-gradient(90deg, #ffffff 0%, #fffdf0 50%, #fff8d6 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #ffffff 35%, rgba(255, 255, 255, 0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.78) 46%, rgba(255, 248, 214, 0.72) 100%)",
  "--ec-hero-bottom-gradient":
    "linear-gradient(180deg, rgba(255, 248, 214, 0) 0%, #fff8d6 100%)",
  "--ec-cta-bg": "#fffbe6",
  "--ec-cta-shield-bg": "#FFF9CC",
  "--ec-compliance-bg": "#f9fafb",
  "--ec-step-bg": "#f5f5f5",
  "--ec-step-card-bg": "#f9fafb",
  "--ec-tag-bg": "#FFF9CC",
  "--ec-tag-text": "#FBCB19",
  "--ec-footer-bg": "#354138",
  "--ec-login-bg":
    "linear-gradient(135deg, #f9fafb 0%, #fffbe6 50%, #FFF9CC 100%)",
  "--ec-login-card-bg": "rgba(255, 255, 255, 0.85)",
  "--ec-spinner-overlay": "rgba(255, 255, 255, 0.7)",
  "--ec-error-bg": "#fef2f2",
  "--ec-error-border": "#fecaca",
  "--ec-error-text": "#dc2626",
  "--ec-divider-color": "#e5e7eb",
  "--ec-input-text": "#333",
  "--ec-input-placeholder": "#bbb",
  "--ec-nav-bg": "#ffffff",
};

const cssVarsDark = {
  "--ec-bg": "#181A1B",
  "--ec-bg-secondary": "#1e2122",
  "--ec-bg-tertiary": "#1e2122",
  "--ec-bg-card": "#222526",
  "--ec-bg-card-alt": "#1e2122",
  "--ec-bg-input": "#222526",
  "--ec-text": "#e8e6e3",
  "--ec-text-secondary": "#b0aba5",
  "--ec-text-muted": "#8a8580",
  "--ec-text-faint": "#6b6660",
  "--ec-heading": "#ffffff",
  "--ec-primary": "#FBCB19",
  "--ec-primary-hover": "#D4A800",
  "--ec-primary-bg": "rgba(254, 208, 1, 0.15)",
  "--ec-primary-dark": "#FBCB19",
  "--ec-border": "#2e3133",
  "--ec-border-light": "#2e3133",
  "--ec-shadow": "rgba(0, 0, 0, 0.2)",
  "--ec-card-hover-shadow": "rgba(0, 0, 0, 0.3)",
  "--ec-hero-gradient":
    "linear-gradient(90deg, #181A1B 0%, #1e2122 50%, #222526 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #181A1B 35%, rgba(24, 26, 27, 0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #181A1B 0%, rgba(24, 26, 27, 0.78) 46%, rgba(34, 37, 38, 0.72) 100%)",
  "--ec-hero-bottom-gradient":
    "linear-gradient(180deg, rgba(34, 37, 38, 0) 0%, #222526 100%)",
  "--ec-cta-bg": "#1e2122",
  "--ec-cta-shield-bg": "rgba(254, 208, 1, 0.15)",
  "--ec-compliance-bg": "#1e2122",
  "--ec-step-bg": "#2a2d2e",
  "--ec-step-card-bg": "#222526",
  "--ec-tag-bg": "rgba(254, 208, 1, 0.15)",
  "--ec-tag-text": "#FBCB19",
  "--ec-footer-bg": "#111314",
  "--ec-login-bg":
    "linear-gradient(135deg, #181A1B 0%, #1e2122 50%, #222526 100%)",
  "--ec-login-card-bg": "rgba(34, 37, 38, 0.85)",
  "--ec-spinner-overlay": "rgba(24, 26, 27, 0.7)",
  "--ec-error-bg": "rgba(220, 38, 38, 0.1)",
  "--ec-error-border": "rgba(220, 38, 38, 0.3)",
  "--ec-error-text": "#f87171",
  "--ec-divider-color": "#2e3133",
  "--ec-input-text": "#e8e6e3",
  "--ec-input-placeholder": "#6b6660",
  "--ec-nav-bg": "#181A1B",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const vars = isDark ? cssVarsDark : cssVarsLight;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          ...(isDark ? darkTheme : lightTheme),
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
