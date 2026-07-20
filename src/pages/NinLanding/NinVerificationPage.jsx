import React from "react";
import NinHero from "./NinHero";
import NinTrustBar from "./NinTrustBar";
import NinBenefits from "./NinBenefits";
import NinHowItWorks from "./NinHowItWorks";
import NinLoginSample from "./NinLoginSample";
import NinCompliance from "./NinCompliance";
import NinCta from "./NinCta";
import { PageWrapper } from "./NinLanding.elements";

const NinVerificationPage = () => {
  return (
    <PageWrapper>
      <NinHero />
      <NinBenefits />
      <NinHowItWorks />
      <NinLoginSample />
      <NinCompliance />
      <NinCta />
    </PageWrapper>
  );
};

export default NinVerificationPage;
