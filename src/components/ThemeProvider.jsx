import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { lightTheme, darkTheme } from "../theme/themeConfig";

const ThemeContext = createContext();

const cssVarsLight = {
  "--ec-bg": "#ffffff",
  "--ec-bg-secondary": "#f9fafb",
  "--ec-bg-tertiary": "#fff1f1",
  "--ec-bg-card": "#ffffff",
  "--ec-bg-card-alt": "#fff5f5",
  "--ec-bg-input": "#ffffff",
  "--ec-text": "#1a1a1a",
  "--ec-text-secondary": "#555",
  "--ec-text-muted": "#777",
  "--ec-text-faint": "#999",
  "--ec-heading": "#1a1a1a",
  "--ec-primary": "#DD0201",
  "--ec-primary-hover": "#ff1a19",
  "--ec-primary-bg": "#fce8e8",
  "--ec-primary-dark": "#b30100",
  "--ec-border": "#e5e7eb",
  "--ec-border-light": "#f0f0f0",
  "--ec-shadow": "rgba(0, 0, 0, 0.06)",
  "--ec-hero-gradient":
    "linear-gradient(90deg, #ffffff 0%, #fff1f1 50%, #fce8e8 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #ffffff 35%, rgba(255, 255, 255, 0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.78) 46%, rgba(252, 232, 232, 0.72) 100%)",
  "--ec-hero-bottom-gradient":
    "linear-gradient(180deg, rgba(252, 232, 232, 0) 0%, #fce8e8 100%)",
  "--ec-cta-bg": "#fff5f5",
  "--ec-cta-shield-bg": "#fce8e8",
  "--ec-compliance-bg": "#f9fafb",
  "--ec-step-bg": "#f5f5f5",
  "--ec-step-card-bg": "#f9fafb",
  "--ec-feature-card-bg": "#ffffff",
  "--ec-tag-bg": "#fce8e8",
  "--ec-tag-text": "#DD0201",
  "--ec-footer-bg": "#1a1a1a",
  "--ec-login-bg":
    "linear-gradient(135deg, #f9fafb 0%, #fff5f5 50%, #fce8e8 100%)",
  "--ec-login-card-bg": "rgba(255, 255, 255, 0.85)",
  "--ec-spinner-overlay": "rgba(255, 255, 255, 0.7)",
  "--ec-error-bg": "#fef2f2",
  "--ec-error-border": "#fecaca",
  "--ec-error-text": "#dc2626",
  "--ec-check-item-color": "#555",
  "--ec-logo-badge-bg": "#fff",
  "--ec-sso-btn-bg": "#fff",
  "--ec-sso-btn-text": "#333",
  "--ec-divider-color": "#e5e7eb",
  "--ec-input-text": "#333",
  "--ec-input-placeholder": "#bbb",
  "--ec-card-hover-shadow": "rgba(0, 0, 0, 0.08)",
  "--ec-nav-bg": "#ffffff",
  "--ec-nav-text": "#333",
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
  "--ec-primary": "#DD0201",
  "--ec-primary-hover": "#ff1a19",
  "--ec-primary-bg": "rgba(221, 2, 1, 0.15)",
  "--ec-primary-dark": "#b30100",
  "--ec-border": "#2e3133",
  "--ec-border-light": "#2e3133",
  "--ec-shadow": "rgba(0, 0, 0, 0.2)",
  "--ec-hero-gradient":
    "linear-gradient(90deg, #181A1B 0%, #1e2122 50%, #222526 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #181A1B 35%, rgba(24, 26, 27, 0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #181A1B 0%, rgba(24, 26, 27, 0.78) 46%, rgba(34, 37, 38, 0.72) 100%)",
  "--ec-hero-bottom-gradient":
    "linear-gradient(180deg, rgba(34, 37, 38, 0) 0%, #222526 100%)",
  "--ec-cta-bg": "#1e2122",
  "--ec-cta-shield-bg": "rgba(221, 2, 1, 0.15)",
  "--ec-compliance-bg": "#1e2122",
  "--ec-step-bg": "#2a2d2e",
  "--ec-step-card-bg": "#222526",
  "--ec-feature-card-bg": "#222526",
  "--ec-tag-bg": "rgba(221, 2, 1, 0.15)",
  "--ec-tag-text": "#ff4d4d",
  "--ec-footer-bg": "#111314",
  "--ec-login-bg":
    "linear-gradient(135deg, #181A1B 0%, #1e2122 50%, #222526 100%)",
  "--ec-login-card-bg": "rgba(34, 37, 38, 0.85)",
  "--ec-spinner-overlay": "rgba(24, 26, 27, 0.7)",
  "--ec-error-bg": "rgba(220, 38, 38, 0.1)",
  "--ec-error-border": "rgba(220, 38, 38, 0.3)",
  "--ec-error-text": "#f87171",
  "--ec-check-item-color": "#b0aba5",
  "--ec-logo-badge-bg": "#222526",
  "--ec-sso-btn-bg": "#222526",
  "--ec-sso-btn-text": "#e8e6e3",
  "--ec-divider-color": "#2e3133",
  "--ec-input-text": "#e8e6e3",
  "--ec-input-placeholder": "#6b6660",
  "--ec-card-hover-shadow": "rgba(0, 0, 0, 0.3)",
  "--ec-nav-bg": "#181A1B",
  "--ec-nav-text": "#e8e6e3",
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
