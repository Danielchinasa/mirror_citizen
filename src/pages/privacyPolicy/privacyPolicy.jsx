import React from "react";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <h3>Privacy Policy</h3>
      <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />;
    </div>
  );
};

export default PrivacyPolicy;
