import React, { useState, useEffect } from "react";
import privacyPdf from "../../images/e-raia Kenya Privacy Notice EN-SW v1.2 - Confirmed Service Scope.pdf";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const PrivacyPolicy = () => {
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
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">{isSw ? "Sera ya Faragha" : "Privacy Policy"}</h3>
      <iframe
        src={privacyPdf}
        title="e-raia Privacy Policy"
        style={{
          width: "100%",
          height: "70vh",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          display: "block",
        }}
      />
    </div>
  );
};

export default PrivacyPolicy;
