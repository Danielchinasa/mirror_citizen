import React from "react";
import VehicleHero from "./VehicleHero";
import VehicleTrustBar from "./VehicleTrustBar";
import VehicleBenefits from "./VehicleBenefits";
import VehicleHowItWorks from "./VehicleHowItWorks";
import VehicleLoginSample from "./VehicleLoginSample";
import ComplianceSection from "../../components/ComplianceSection/ComplianceSection";
import VehicleCta from "./VehicleCta";
import Footer from "../../components/Footer/Footer";
import { PageWrapper } from "./VehicleLanding.elements";

const VehicleVerificationPage = () => {
  return (
    <PageWrapper>
      <VehicleHero />
      {/* <VehicleTrustBar /> */}
      <VehicleBenefits />
      <VehicleHowItWorks />
      <VehicleLoginSample />
      <ComplianceSection />
      <VehicleCta />
      <Footer />
    </PageWrapper>
  );
};

export default VehicleVerificationPage;
