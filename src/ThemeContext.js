import React, { createContext, useState, useContext, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext();
const storedTheme = localStorage.getItem("theme") || "light";


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(storedTheme);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const currentTheme = theme === "light" ? lightTheme : darkTheme;
    document.documentElement.style.setProperty("--body-background", currentTheme.background);
    document.documentElement.style.setProperty("--text-color", currentTheme.labelColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
