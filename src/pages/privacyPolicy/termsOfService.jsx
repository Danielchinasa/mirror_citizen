import React from "react";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";

const TermsOfService = () => {
  return (
    <div className="container mt-5">
      <h3>Terms of Service</h3>
      <div dangerouslySetInnerHTML={{ __html: termsOfService }} />;
    </div>
  );
};

export default TermsOfService;
