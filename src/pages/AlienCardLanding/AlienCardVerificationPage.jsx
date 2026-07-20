import React from "react";
import AlienCardHero from "./AlienCardHero";
import AlienCardTrustBar from "./AlienCardTrustBar";
import AlienCardBenefits from "./AlienCardBenefits";
import AlienCardHowItWorks from "./AlienCardHowItWorks";
import AlienCardLoginSample from "./AlienCardLoginSample";
import AlienCardCompliance from "./AlienCardCompliance";
import AlienCardCta from "./AlienCardCta";
import { PageWrapper } from "./AlienCardLanding.elements";

const AlienCardVerificationPage = () => {
  return (
    <PageWrapper>
      <AlienCardHero />
      <AlienCardTrustBar />
      <AlienCardBenefits />
      <AlienCardHowItWorks />
      <AlienCardLoginSample />
      <AlienCardCompliance />
      <AlienCardCta />
    </PageWrapper>
  );
};

export default AlienCardVerificationPage;
