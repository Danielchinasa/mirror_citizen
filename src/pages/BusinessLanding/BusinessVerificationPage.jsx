import React from "react";
import BusinessHero from "./BusinessHero";
import BusinessTrustBar from "./BusinessTrustBar";
import BusinessBenefits from "./BusinessBenefits";
import BusinessHowItWorks from "./BusinessHowItWorks";
import BusinessLoginSample from "./BusinessLoginSample";
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import BusinessCta from "./BusinessCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "./BusinessLanding.elements";

const BusinessVerificationPage = () => {
  return (
    <PageWrapper>
      <BusinessHero />
      <BusinessTrustBar />
      <BusinessBenefits />
      <BusinessHowItWorks />
      <BusinessLoginSample />
      <ComplianceSection />
      <BusinessCta />
      <Footer />
    </PageWrapper>
  );
};

export default BusinessVerificationPage;
