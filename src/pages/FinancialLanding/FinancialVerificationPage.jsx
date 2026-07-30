import React from "react";
import FinancialHero from "./FinancialHero";
import FinancialTrustBar from "./FinancialTrustBar";
import FinancialBenefits from "./FinancialBenefits";
import FinancialHowItWorks from "./FinancialHowItWorks";
import FinancialLoginSample from "./FinancialLoginSample";
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import FinancialCta from "./FinancialCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "../NinLanding/NinLanding.elements";

const FinancialVerificationPage = () => {
  return (
    <PageWrapper>
      <FinancialHero />
      <FinancialTrustBar />
      <FinancialBenefits />
      <FinancialHowItWorks />
      <FinancialLoginSample />
      <ComplianceSection />
      <FinancialCta />
      <Footer />
    </PageWrapper>
  );
};

export default FinancialVerificationPage;
