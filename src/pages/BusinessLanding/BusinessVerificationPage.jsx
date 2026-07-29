import React from "react";
import BusinessHero from "./BusinessHero";
import BusinessTrustBar from "./BusinessTrustBar";
import BusinessBenefits from "./BusinessBenefits";
import BusinessHowItWorks from "./BusinessHowItWorks";
import BusinessLoginSample from "./BusinessLoginSample";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import BusinessCta from "./BusinessCta";
import { PageWrapper } from "./BusinessLanding.elements";

const BusinessVerificationPage = () => {
  return (
    <PageWrapper>
      <BusinessHero />
      <BusinessTrustBar />
      <BusinessBenefits />
      <BusinessHowItWorks />
      <BusinessLoginSample />
      <ComplianceBar />
      <BusinessCta />
    </PageWrapper>
  );
};

export default BusinessVerificationPage;
