import React from "react";
import FinancialHero from "./FinancialHero";
import FinancialTrustBar from "./FinancialTrustBar";
import FinancialBenefits from "./FinancialBenefits";
import FinancialHowItWorks from "./FinancialHowItWorks";
import FinancialLoginSample from "./FinancialLoginSample";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import FinancialCta from "./FinancialCta";
import { PageWrapper } from "../NinLanding/NinLanding.elements";

const FinancialVerificationPage = () => {
  return (
    <PageWrapper>
      <FinancialHero />
      <FinancialTrustBar />
      <FinancialBenefits />
      <FinancialHowItWorks />
      <FinancialLoginSample />
      <ComplianceBar />
      <FinancialCta />
    </PageWrapper>
  );
};

export default FinancialVerificationPage;
