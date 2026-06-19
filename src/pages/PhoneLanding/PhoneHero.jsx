import React, { useState } from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import heroImg from "../../images/phone_number_verification.png";
import {
  HeroSectionWrapper,
  HeroBgImage,
  HeroMobileImage,
  HeroContainer,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryBtn,
  SecondaryBtn,
  PriceBadge,
} from "./PhoneLanding.elements";

const PhoneHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/phone");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroSectionWrapper>
        <HeroBgImage src={heroImg} alt="Phone Number Verification on eCitizen" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>PHONE VERIFICATION</HeroTag>
            <HeroTitle>
              Verify a <span>phone number</span> in seconds
            </HeroTitle>
            <HeroSubtitle>
              Instant, secure and reliable phone number verification for
              onboarding, due diligence and fraud&nbsp;prevention.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                Verify Phone Now <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                See Sample Result <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadge>
              From <span>{getPrice(9) || "₦800"}</span> per verification
            </PriceBadge>
            <HeroMobileImage
              src={heroImg}
              alt="Phone Number Verification on eCitizen"
            />
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="phone"
      />
    </>
  );
};

export default PhoneHero;
