import React from "react";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import termsOfServiceFR from "../../termsOfServiceFR";
import { useLocale } from "../../components/LocaleProvider";

const TermsOfService = () => {
  const { language, t } = useLocale();
  const content = language === "FR" ? termsOfServiceFR : termsOfService;

  return (
    <div className="container mt-5">
      <h3>{t("termsOfService.title")}</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />;
    </div>
  );
};

export default TermsOfService;
