import React from "react";
import termsPdf from "../../images/citoyen Cote dIvoire Terms of Service FR-EN v1.2 - Confirmed Service Scope.pdf";
import { useLocale } from "../../components/LocaleProvider";

const TermsOfService = () => {
  const { t } = useLocale();

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">{t("termsOfService.title")}</h3>
      <iframe
        src={termsPdf}
        title={t("termsOfService.title")}
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

export default TermsOfService;
