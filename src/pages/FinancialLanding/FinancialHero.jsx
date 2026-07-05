import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
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

  @media screen and (max-width: 960px) {
    max-height: 320px;
  }

  @media screen and (max-width: 600px) {
    max-height: 260px;
  }
`;

const FinancialHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/bvn");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
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
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                See Sample Result <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadge>
              From <span>{getPrice(4) || "GH₵1,500"}</span> per report
            </PriceBadge>
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="financial"
      />
    </>
  );
};

export default FinancialHero;
