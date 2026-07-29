import React from "react";
import NinHero from "./NinHero";
import NinTrustBar from "./NinTrustBar";
import NinBenefits from "./NinBenefits";
import NinHowItWorks from "./NinHowItWorks";
import NinLoginSample from "./NinLoginSample";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import NinCta from "./NinCta";
import { PageWrapper } from "./NinLanding.elements";

const NinVerificationPage = () => {
  return (
    <PageWrapper>
      <NinHero />
      <NinBenefits />
      <NinHowItWorks />
      <NinLoginSample />
      <ComplianceBar />
      <NinCta />
    </PageWrapper>
  );
};

export default NinVerificationPage;
