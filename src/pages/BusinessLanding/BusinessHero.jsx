import React, { useState } from "react";
import { FaArrowRight, FaEye, FaCheckCircle } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import heroImg from "../../images/business_verification2.png";
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
  HeroChecks,
  HeroCheck,
} from "./BusinessLanding.elements";

const BusinessHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/business");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroSectionWrapper>
        <HeroBgImage src={heroImg} alt="Business Verification on eCitizen" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>BUSINESS VERIFICATION</HeroTag>
            <HeroTitle>
              Verify a <span>company</span>
            </HeroTitle>
            <HeroSubtitle>
              Verify company registration, ownership, and key business details
              securely in seconds. Make confident business decisions.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                Verify Company Now <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                See Sample Result <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadgesRow>
              <PriceBadge>
                Basic check from <span>{getPrice(2) || "₦100"}</span>
              </PriceBadge>
              <PriceBadge>
                Advanced profile from <span>{getPrice(3) || "₦800"}</span>
              </PriceBadge>
            </PriceBadgesRow>
            <HeroChecks>
              <HeroCheck>
                <FaCheckCircle /> Secure &amp; Private
              </HeroCheck>
              <HeroCheck>
                <FaCheckCircle /> Official Data Sources
              </HeroCheck>
              <HeroCheck>
                <FaCheckCircle /> Fast Results
              </HeroCheck>
            </HeroChecks>
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="business"
      />
    </>
  );
};

export default BusinessHero;
