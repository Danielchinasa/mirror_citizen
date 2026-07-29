import React from "react";
import VehicleHero from "./VehicleHero";
import VehicleTrustBar from "./VehicleTrustBar";
import VehicleBenefits from "./VehicleBenefits";
import VehicleHowItWorks from "./VehicleHowItWorks";
import VehicleLoginSample from "./VehicleLoginSample";
import ComplianceBar from "../../components/ComplianceBar/ComplianceBar";
import VehicleCta from "./VehicleCta";
import { PageWrapper } from "./VehicleLanding.elements";

const VehicleVerificationPage = () => {
  return (
    <PageWrapper>
      <VehicleHero />
      <VehicleBenefits />
      <VehicleHowItWorks />
      <VehicleLoginSample />
      <ComplianceBar />
      <VehicleCta />
    </PageWrapper>
  );
};

export default VehicleVerificationPage;
