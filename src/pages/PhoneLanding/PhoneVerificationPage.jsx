import React from "react";
import PhoneNavbar from "../../components/PhoneNavbar/PhoneNavbar";
import PhoneHero from "./PhoneHero";
import PhoneTrustBar from "./PhoneTrustBar";
import PhoneBenefits from "./PhoneBenefits";
import PhoneHowItWorks from "./PhoneHowItWorks";
import PhoneLoginSample from "./PhoneLoginSample";
import PhoneCompliance from "./PhoneCompliance";
import PhoneCta from "./PhoneCta";
import { PageWrapper } from "./PhoneLanding.elements";

const PhoneVerificationPage = () => {
  return (
    <PageWrapper>
      <PhoneNavbar />
      <PhoneHero />
      <PhoneTrustBar />
      <PhoneBenefits />
      <PhoneHowItWorks />
      <PhoneLoginSample />
      <PhoneCompliance />
      <PhoneCta />
    </PageWrapper>
  );
};

export default PhoneVerificationPage;
