import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { lightTheme, darkTheme } from "../theme/themeConfig";

const ThemeContext = createContext();

const lightVars = {
  "--ec-bg": "#ffffff",
  "--ec-bg-secondary": "#f9fafb",
  "--ec-bg-card": "#ffffff",
  "--ec-bg-primary-light": "#fef2f2",
  "--ec-bg-primary-muted": "#fdecec",
  "--ec-text": "#111827",
  "--ec-text-secondary": "#374151",
  "--ec-text-muted": "#555555",
  "--ec-text-faint": "#777777",
  "--ec-text-faintest": "#999999",
  "--ec-heading": "#1a1a1a",
  "--ec-heading-alt": "#1a1a1a",
  "--ec-primary": "#DD0201",
  "--ec-primary-hover": "#ff4d4f",
  "--ec-primary-dark": "#b91c1c",
  "--ec-border": "#e5e7eb",
  "--ec-border-light": "rgba(17,24,39,0.08)",
  "--ec-hero-bg":
    "linear-gradient(90deg, #ffffff 0%, #fff1f1 50%, #fce8e8 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #ffffff 35%, rgba(255,255,255,0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.78) 46%, rgba(252,232,232,0.72) 100%)",
  "--ec-cta-bg": "#fef2f2",
  "--ec-cta-shield": "#eec3c3",
  "--ec-compliance-bg": "#f9fafb",
  "--ec-nav-bg": "#ffffff",
  "--ec-mobile-menu-bg": "#101522",
  "--ec-footer-bg": "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
  "--ec-footer-text": "#111827",
  "--ec-footer-muted": "#4b5563",
  "--ec-footer-faint": "#6b7280",
  "--ec-shadow-md": "0 4px 20px rgba(0,0,0,0.06)",
  "--ec-shadow-nav": "0 2px 12px rgba(15,23,42,0.06)",
  "--ec-shadow-popup": "0 24px 70px rgba(0,0,0,0.18)",
  "--ec-verified-bg": "#ecfdf5",
  "--ec-verified-text": "#16a34a",
  "--ec-info-bg": "#eff6ff",
  "--ec-info-text": "#1d4ed8",
  "--ec-step-icon-bg": "#fef2f2",
  "--ec-sidebar-bg": "#fef2f2",
  "--ec-sidebar-border": "#d1fae5",
};

const darkVars = {
  "--ec-bg": "#0f1117",
  "--ec-bg-secondary": "#1a1c1e",
  "--ec-bg-card": "#1e2023",
  "--ec-bg-primary-light": "#1f0d0d",
  "--ec-bg-primary-muted": "#2a1010",
  "--ec-text": "#f1f3f5",
  "--ec-text-secondary": "#c9d1d9",
  "--ec-text-muted": "#9ca3af",
  "--ec-text-faint": "#6b7280",
  "--ec-text-faintest": "#6b7280",
  "--ec-heading": "#f9fafb",
  "--ec-heading-alt": "#e2e8f0",
  "--ec-primary": "#DD0201",
  "--ec-primary-hover": "#ff4d4f",
  "--ec-primary-dark": "#ff6060",
  "--ec-border": "#2d3139",
  "--ec-border-light": "rgba(255,255,255,0.08)",
  "--ec-hero-bg":
    "linear-gradient(90deg, #0f1117 0%, #1a0d0d 50%, #1f1010 100%)",
  "--ec-hero-overlay":
    "linear-gradient(90deg, #0f1117 35%, rgba(15,17,23,0) 100%)",
  "--ec-hero-overlay-mobile":
    "linear-gradient(180deg, #0f1117 0%, rgba(15,17,23,0.88) 46%, rgba(31,16,16,0.82) 100%)",
  "--ec-cta-bg": "#1f0d0d",
  "--ec-cta-shield": "#3a1515",
  "--ec-compliance-bg": "#1a1c1e",
  "--ec-nav-bg": "#0f1117",
  "--ec-mobile-menu-bg": "#070a0d",
  "--ec-footer-bg": "linear-gradient(180deg, #0f1117 0%, #1a1c1e 100%)",
  "--ec-footer-text": "#f1f3f5",
  "--ec-footer-muted": "#9ca3af",
  "--ec-footer-faint": "#6b7280",
  "--ec-shadow-md": "0 4px 20px rgba(0,0,0,0.35)",
  "--ec-shadow-nav": "0 2px 12px rgba(0,0,0,0.4)",
  "--ec-shadow-popup": "0 24px 70px rgba(0,0,0,0.5)",
  "--ec-verified-bg": "#0d2d1f",
  "--ec-verified-text": "#34d399",
  "--ec-info-bg": "#0f1e3d",
  "--ec-info-text": "#93c5fd",
  "--ec-step-icon-bg": "#1f0d0d",
  "--ec-sidebar-bg": "#1f0d0d",
  "--ec-sidebar-border": "#2d3139",
};

const applyVars = (vars) => {
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, val]) =>
    root.style.setProperty(key, val),
  );
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme === "dark";
    setIsDark(dark);
    applyVars(dark ? darkVars : lightVars);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    applyVars(newDark ? darkVars : lightVars);
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
