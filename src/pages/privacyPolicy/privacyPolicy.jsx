import React from "react";
import { useLocale } from "../../components/LocaleProvider";
import { getPrivacyPolicy } from "../../policyContent";

const PrivacyPolicy = () => {
  const { language } = useLocale();
  return (
    <div className="container mt-5">
      <h3>Privacy Policy</h3>
      <div dangerouslySetInnerHTML={{ __html: getPrivacyPolicy(language) }} />;
    </div>
  );
};

export default PrivacyPolicy;
