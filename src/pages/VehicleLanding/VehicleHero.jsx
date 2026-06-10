import React from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import vehicleHeroImg from "../../images/VIN_verification_platform_in_nigeria.png";
import {
  HeroSectionWrapper,
  HeroBgImage,
  HeroContainer,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryBtn,
  SecondaryBtn,
  PriceBadgesRow,
  PriceBadge,
} from "./VehicleLanding.elements";

const VehicleHero = () => {
  const verifyLink = useAuthRedirect("/verify/vehicle");
  const { getPrice } = useServicePrices();

  return (
    <HeroSectionWrapper>
      <HeroBgImage
        src={vehicleHeroImg}
        alt="Vehicle Verification on eCitizen"
      />
      <HeroContainer>
        <HeroContent>
          <HeroTag>VEHICLE VERIFICATION</HeroTag>
          <HeroTitle>
            Check <span>vehicle history</span> before
            <br />
            you buy
          </HeroTitle>
          <HeroSubtitle>
            Verify a vehicle by plate number or VIN to reduce fraud and make
            safer purchase decisions.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryBtn to={verifyLink}>
              Verify Vehicle Now <FaArrowRight />
            </PrimaryBtn>
            <SecondaryBtn href="#sample-result">
              See Sample Result <FaEye />
            </SecondaryBtn>
          </HeroButtons>
          <PriceBadgesRow>
            <PriceBadge>
              VIN checks from <span>{getPrice(5) || "₦6,000"}</span>
            </PriceBadge>
          </PriceBadgesRow>
        </HeroContent>
      </HeroContainer>
    </HeroSectionWrapper>
  );
};

export default VehicleHero;
