import React from "react";
import FinancialNavbar from "../../components/FinancialNavbar/FinancialNavbar";
import FinancialHero from "./FinancialHero";
import FinancialTrustBar from "./FinancialTrustBar";
import FinancialBenefits from "./FinancialBenefits";
import FinancialHowItWorks from "./FinancialHowItWorks";
import FinancialLoginSample from "./FinancialLoginSample";
import FinancialCompliance from "./FinancialCompliance";
import FinancialCta from "./FinancialCta";
import { PageWrapper } from "../NinLanding/NinLanding.elements";

const FinancialVerificationPage = () => {
  return (
    <PageWrapper>
      <FinancialNavbar />
      <FinancialHero />
      <FinancialTrustBar />
      <FinancialBenefits />
      <FinancialHowItWorks />
      <FinancialLoginSample />
      <FinancialCompliance />
      <FinancialCta />
    </PageWrapper>
  );
};

export default FinancialVerificationPage;
