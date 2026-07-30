import React from "react";
import PhoneHero from "./PhoneHero";
import PhoneTrustBar from "./PhoneTrustBar";
import PhoneBenefits from "./PhoneBenefits";
import PhoneHowItWorks from "./PhoneHowItWorks";
import PhoneLoginSample from "./PhoneLoginSample";
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import PhoneCta from "./PhoneCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "./PhoneLanding.elements";

const PhoneVerificationPage = () => {
  return (
    <PageWrapper>
      <PhoneHero />
      <PhoneTrustBar />
      <PhoneBenefits />
      <PhoneHowItWorks />
      <PhoneLoginSample />
      <ComplianceSection />
      <PhoneCta />
      <Footer />
    </PageWrapper>
  );
};

export default PhoneVerificationPage;
