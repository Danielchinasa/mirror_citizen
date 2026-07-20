import React from "react";
import CardHero from "./CardHero";
import CardTrustBar from "./CardTrustBar";
import CardBenefits from "./CardBenefits";
import CardHowItWorks from "./CardHowItWorks";
import CardLoginSample from "./CardLoginSample";
import CardCompliance from "./CardCompliance";
import CardCta from "./CardCta";
import { PageWrapper } from "./CardLanding.elements";

const CardVerificationPage = () => {
  return (
    <PageWrapper>
      <CardHero />
      <CardTrustBar />
      <CardBenefits />
      <CardHowItWorks />
      <CardLoginSample />
      <CardCompliance />
      <CardCta />
    </PageWrapper>
  );
};

export default CardVerificationPage;
