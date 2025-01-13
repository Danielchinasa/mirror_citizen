import React from "react";
import { useTheme } from "../ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      style={{
        margin: "27px",
        padding: "5px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: "1.5rem", // Adjust size
      }}
      aria-label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggleButton;
