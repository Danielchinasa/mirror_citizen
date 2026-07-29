import React from "react";
import PhoneHero from "./PhoneHero";
import PhoneTrustBar from "./PhoneTrustBar";
import PhoneBenefits from "./PhoneBenefits";
import PhoneHowItWorks from "./PhoneHowItWorks";
import PhoneLoginSample from "./PhoneLoginSample";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import PhoneCta from "./PhoneCta";
import { PageWrapper } from "./PhoneLanding.elements";

const PhoneVerificationPage = () => {
  return (
    <PageWrapper>
      <PhoneHero />
      <PhoneTrustBar />
      <PhoneBenefits />
      <PhoneHowItWorks />
      <PhoneLoginSample />
      <ComplianceBar />
      <PhoneCta />
    </PageWrapper>
  );
};

export default PhoneVerificationPage;
