import React from "react";
import termsPdf from "../../images/e-citizen_Nigeria_Terms_of_Service_v2.1_Confirmed.pdf";

const TermsOfService = () => {
  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">Terms of Service</h3>
      <iframe
        src={termsPdf}
        title="e-citizen Terms of Service"
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
