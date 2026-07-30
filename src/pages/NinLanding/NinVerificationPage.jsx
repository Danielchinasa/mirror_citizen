import React from "react";
import NinHero from "./NinHero";
import NinTrustBar from "./NinTrustBar";
import NinBenefits from "./NinBenefits";
import NinHowItWorks from "./NinHowItWorks";
import NinLoginSample from "./NinLoginSample";
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import NinCta from "./NinCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "./NinLanding.elements";

const NinVerificationPage = () => {
  return (
    <PageWrapper>
      <NinHero />
      {/* <NinTrustBar /> */}
      <NinBenefits />
      <NinHowItWorks />
      <NinLoginSample />
      <ComplianceSection />
      <NinCta />
      <Footer />
    </PageWrapper>
  );
};

export default NinVerificationPage;
