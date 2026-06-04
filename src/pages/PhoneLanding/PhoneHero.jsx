import React from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
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
  const verifyLink = useAuthRedirect("/verify/phone");

  return (
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
            <SecondaryBtn href="#sample-result">
              See Sample Result <FaEye />
            </SecondaryBtn>
          </HeroButtons>
          <PriceBadge>
            From <span>N</span>800 per verification
          </PriceBadge>
          <HeroMobileImage
            src={heroImg}
            alt="Phone Number Verification on eCitizen"
          />
        </HeroContent>
      </HeroContainer>
    </HeroSectionWrapper>
  );
};

export default PhoneHero;
