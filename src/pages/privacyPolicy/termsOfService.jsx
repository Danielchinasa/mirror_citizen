import React, { useState, useEffect } from "react";
import termsOfService, { termsOfServiceSW } from "../../termsOfService";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const TermsOfService = () => {
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h3>{isSw ? "Sheria na Masharti" : "Terms of Service"}</h3>
      <div dangerouslySetInnerHTML={{ __html: isSw ? termsOfServiceSW : termsOfService }} />;
    </div>
  );
};

export default TermsOfService;
