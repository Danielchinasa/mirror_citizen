import React from "react";
import BusinessNavbar from "../../components/BusinessNavbar/BusinessNavbar";
import BusinessHero from "./BusinessHero";
import BusinessTrustBar from "./BusinessTrustBar";
import BusinessBenefits from "./BusinessBenefits";
import BusinessHowItWorks from "./BusinessHowItWorks";
import BusinessLoginSample from "./BusinessLoginSample";
import BusinessCompliance from "./BusinessCompliance";
import BusinessCta from "./BusinessCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "./BusinessLanding.elements";

const BusinessVerificationPage = () => {
  return (
    <PageWrapper>
      <BusinessNavbar />
      <BusinessHero />
      <BusinessTrustBar />
      <BusinessBenefits />
      <BusinessHowItWorks />
      <BusinessLoginSample />
      <BusinessCompliance />
      <BusinessCta />
      <Footer />
    </PageWrapper>
  );
};

export default BusinessVerificationPage;
