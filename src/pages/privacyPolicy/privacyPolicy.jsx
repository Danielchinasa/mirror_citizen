import React from "react";
import privacyPolicy from "../../privacyPolicy";
import privacyPolicyFR from "../../privacyPolicyFR";
import termsOfService from "../../termsOfService";
import { useLocale } from "../../components/LocaleProvider";

const PrivacyPolicy = () => {
  const { language, t } = useLocale();
  const content = language === "FR" ? privacyPolicyFR : privacyPolicy;

  return (
    <div className="container mt-5">
      <h3>{t("privacyPolicy.title")}</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />;
    </div>
  );
};

export default PrivacyPolicy;
