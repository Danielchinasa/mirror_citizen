import React from "react";
import VehicleNavbar from "../../components/VehicleNavbar/VehicleNavbar";
import VehicleHero from "./VehicleHero";
import VehicleTrustBar from "./VehicleTrustBar";
import VehicleBenefits from "./VehicleBenefits";
import VehicleHowItWorks from "./VehicleHowItWorks";
import VehicleLoginSample from "./VehicleLoginSample";
import VehicleCompliance from "./VehicleCompliance";
import VehicleCta from "./VehicleCta";
import { PageWrapper } from "./VehicleLanding.elements";

const VehicleVerificationPage = () => {
  return (
    <PageWrapper>
      <VehicleNavbar />
      <VehicleHero />
      <VehicleTrustBar />
      <VehicleBenefits />
      <VehicleHowItWorks />
      <VehicleLoginSample />
      <VehicleCompliance />
      <VehicleCta />
    </PageWrapper>
  );
};

export default VehicleVerificationPage;
