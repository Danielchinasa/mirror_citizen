import React from "react";
import { useLocale } from "../../components/LocaleProvider";
import { getTermsOfService } from "../../policyContent";

const TermsOfService = () => {
  const { language } = useLocale();
  return (
    <div className="container mt-5">
      <h3>Terms of Service</h3>
      <div dangerouslySetInnerHTML={{ __html: getTermsOfService(language) }} />;
    </div>
  );
};

export default TermsOfService;
