import React from "react";
import styled from "styled-components";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import heroImg from "../../images/credit_profile.png";
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
} from "../NinLanding/NinLanding.elements";

const SmallerHeroImage = styled(HeroBgImage)`
  max-height: 460px;
`;

const FinancialHero = () => {
  const verifyLink = useAuthRedirect("/verify/bvn");

  return (
    <HeroSectionWrapper>
      <SmallerHeroImage src={heroImg} alt="Credit Profile on eCitizen" />
      <HeroContainer>
        <HeroContent>
          <HeroTag>CREDIT PROFILE</HeroTag>
          <HeroTitle>
            Check your
            <br />
            <span>credit profile</span>
            <br />
            in seconds
          </HeroTitle>
          <HeroSubtitle>
            Access a fast, secure BVN-based credit profile to support lending,
            renting and due diligence decisions.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryBtn to={verifyLink}>
              Check Credit Now <FaArrowRight />
            </PrimaryBtn>
            <SecondaryBtn href="#sample-result">
              See Sample Result <FaEye />
            </SecondaryBtn>
          </HeroButtons>
          <PriceBadge>
            From <span>N</span>1,500 per report
          </PriceBadge>
        </HeroContent>
      </HeroContainer>
    </HeroSectionWrapper>
  );
};

export default FinancialHero;
