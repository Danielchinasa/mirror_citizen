import React from "react";
import termsPdf from "../../images/e-raia Uganda Terms of Service EN-SW v1.2 - Confirmed Service Scope.pdf";

const TermsOfService = () => {
  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-3">Terms of Service</h3>
      <iframe
        src={termsPdf}
        title="e-raia Terms of Service"
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
