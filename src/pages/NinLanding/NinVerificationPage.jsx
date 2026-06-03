import React from "react";
import NinNavbar from "../../components/NinNavbar/NinNavbar";
import NinHero from "./NinHero";
import NinTrustBar from "./NinTrustBar";
import NinBenefits from "./NinBenefits";
import NinHowItWorks from "./NinHowItWorks";
import NinLoginSample from "./NinLoginSample";
import NinCompliance from "./NinCompliance";
import NinCta from "./NinCta";
import NinLandingFooter from "./NinLandingFooter";
import { PageWrapper } from "./NinLanding.elements";

const NinVerificationPage = () => {
  return (
    <PageWrapper>
      <NinNavbar />
      <NinHero />
      <NinTrustBar />
      <NinBenefits />
      <NinHowItWorks />
      <NinLoginSample />
      <NinCompliance />
      <NinCta />
      <NinLandingFooter />
    </PageWrapper>
  );
};

export default NinVerificationPage;
