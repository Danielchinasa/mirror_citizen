import React from "react";
import privacyPdf from "../../images/e-citizen_Nigeria_Privacy_Notice_v2.1_Confirmed.pdf";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">Privacy Policy</h3>
      <iframe
        src={privacyPdf}
        title="e-citizen Privacy Policy"
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
