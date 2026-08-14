import React from "react";
import privacyPdf from "../../images/citoyen Cote dIvoire Privacy Notice FR-EN v1.2 - Confirmed Service Scope.pdf";
import { useLocale } from "../../components/LocaleProvider";

const PrivacyPolicy = () => {
  const { t } = useLocale();

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">{t("privacyPolicy.title")}</h3>
      <iframe
        src={privacyPdf}
        title={t("privacyPolicy.title")}
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
