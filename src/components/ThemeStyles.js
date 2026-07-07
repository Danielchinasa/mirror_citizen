import { createGlobalStyle } from "styled-components";

const ThemeStyles = createGlobalStyle`
  :root {
    /* ── Core surfaces ── */
    --ec-bg: ${({ $isDark }) => ($isDark ? "#1a1a2e" : "#ffffff")};
    --ec-bg-card: ${({ $isDark }) => ($isDark ? "#22223a" : "#ffffff")};
    --ec-bg-subtle: ${({ $isDark }) => ($isDark ? "#2a2a42" : "#f9fafb")};
    --ec-bg-hover: ${({ $isDark }) => ($isDark ? "#32324e" : "#f3f4f6")};
    --ec-bg-raised: ${({ $isDark }) => ($isDark ? "#2e2e48" : "#ffffff")};

    /* ── Text ── */
    --ec-text: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#111827")};
    --ec-text-secondary: ${({ $isDark }) => ($isDark ? "#b0b0b0" : "#4b5563")};
    --ec-text-muted: ${({ $isDark }) => ($isDark ? "#888888" : "#6b7280")};
    --ec-text-heading: ${({ $isDark }) => ($isDark ? "#f0f0f0" : "#354138")};
    --ec-text-inverse: ${({ $isDark }) => ($isDark ? "#111827" : "#ffffff")};

    /* ── Borders ── */
    --ec-border: ${({ $isDark }) => ($isDark ? "#3a3a52" : "#e5e7eb")};
    --ec-border-light: ${({ $isDark }) => ($isDark ? "#33334a" : "#f0f0f0")};
    --ec-border-card: ${({ $isDark }) => ($isDark ? "#3a3a52" : "#e5e7eb")};

    /* ── Primary accent ── */
    --ec-primary: #DD0201;
    --ec-primary-hover: #FF4D4F;
    --ec-primary-subtle: ${({ $isDark }) => ($isDark ? "#3a1515" : "#fdecec")};
    --ec-primary-text: ${({ $isDark }) => ($isDark ? "#ff6b6b" : "#DD0201")};

    /* ── Hero ── */
    --ec-hero-bg: ${({ $isDark }) =>
      $isDark
        ? "linear-gradient(90deg, #1a1a2e 0%, #2a1a1a 50%, #2a1a1a 100%)"
        : "linear-gradient(90deg, #ffffff 0%, #fff1f1 50%, #fce8e8 100%)"};
    --ec-hero-mobile-overlay: ${({ $isDark }) =>
      $isDark
        ? "linear-gradient(180deg, #1a1a2e 0%, rgba(26, 26, 46, 0.78) 46%, rgba(42, 26, 26, 0.72) 100%)"
        : "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.78) 46%, rgba(252, 232, 232, 0.72) 100%)"};

    /* ── Navbar ── */
    --ec-nav-bg: ${({ $isDark }) => ($isDark ? "#1a1a2e" : "#ffffff")};
    --ec-nav-text: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#111827")};
    --ec-nav-border: ${({ $isDark }) => ($isDark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)")};
    --ec-nav-hamburger-bg: ${({ $isDark }) => ($isDark ? "#1a1a2e" : "#ffffff")};

    /* ── Footer ── */
    --ec-footer-bg: ${({ $isDark }) =>
      $isDark
        ? "linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)"};
    --ec-footer-text: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#111827")};
    --ec-footer-text-muted: ${({ $isDark }) => ($isDark ? "#999999" : "#4b5563")};
    --ec-footer-border: ${({ $isDark }) => ($isDark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)")};

    /* ── Cards & Forms ── */
    --ec-card-bg: ${({ $isDark }) => ($isDark ? "#22223a" : "#ffffff")};
    --ec-card-border: ${({ $isDark }) => ($isDark ? "#3a3a52" : "#e5e7eb")};
    --ec-input-bg: ${({ $isDark }) => ($isDark ? "#22223a" : "#ffffff")};
    --ec-input-border: ${({ $isDark }) => ($isDark ? "#3a3a52" : "#e5e7eb")};
    --ec-input-text: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#333333")};
    --ec-input-placeholder: ${({ $isDark }) => ($isDark ? "#666666" : "#bbbbbb")};

    /* ── Buttons ── */
    --ec-btn-primary-bg: #DD0201;
    --ec-btn-primary-text: #ffffff;
    --ec-btn-secondary-bg: ${({ $isDark }) => ($isDark ? "#2e2e48" : "#ffffff")};
    --ec-btn-secondary-text: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#333333")};
    --ec-btn-secondary-border: ${({ $isDark }) => ($isDark ? "#3a3a52" : "#e5e7eb")};

    /* ── Glass / blur surfaces ── */
    --ec-glass-bg: ${({ $isDark }) =>
      $isDark ? "rgba(34, 34, 58, 0.92)" : "rgba(255, 255, 255, 0.85)"};
    --ec-glass-border: ${({ $isDark }) =>
      $isDark ? "rgba(221, 2, 1, 0.25)" : "rgba(220, 5, 2, 0.12)"};

    /* ── Transparency helpers ── */
    --ec-overlay: ${({ $isDark }) => ($isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)")};
    --ec-spinner-overlay: ${({ $isDark }) =>
      $isDark ? "rgba(26, 26, 46, 0.8)" : "rgba(255, 255, 255, 0.7)"};
    --ec-shadow: ${({ $isDark }) =>
      $isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)"};
  }
`;

export default ThemeStyles;
