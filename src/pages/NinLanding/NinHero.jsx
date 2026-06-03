import React from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import ninHeroImg from "../../images/nin_verification_hero2.png";
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
  PriceBadge,
} from "./NinLanding.elements";

const NinHero = () => {
  return (
    <HeroSectionWrapper>
      <HeroBgImage src={ninHeroImg} alt="NIN Verification on eCitizen" />
      <HeroContainer>
        <HeroContent>
          <HeroTag>NIN VERIFICATION</HeroTag>
          <HeroTitle>
            Verify your
            <br />
            <span>NIN online</span>
            <br />
            in minutes
          </HeroTitle>
          <HeroSubtitle>
            Instant, secure and reliable National Identification Number (NIN)
            verification for individuals and&nbsp;businesses.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryBtn to="/verification-login">
              Verify NIN Now <FaArrowRight />
            </PrimaryBtn>
            <SecondaryBtn href="#sample-result">
              See Sample Result <FaEye />
            </SecondaryBtn>
          </HeroButtons>
          <PriceBadge>
            From <span>N</span>600 per verification
          </PriceBadge>
        </HeroContent>
      </HeroContainer>
    </HeroSectionWrapper>
  );
};

export default NinHero;
