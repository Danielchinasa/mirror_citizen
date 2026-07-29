import React, { useState, useEffect } from "react";
import privacyPolicy, { privacyPolicySW } from "../../privacyPolicy";

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
    <div className="container mt-5">
      <h3>{isSw ? "Sera ya Faragha" : "Privacy Policy"}</h3>
      <div dangerouslySetInnerHTML={{ __html: isSw ? privacyPolicySW : privacyPolicy }} />;
    </div>
  );
};

export default PrivacyPolicy;
