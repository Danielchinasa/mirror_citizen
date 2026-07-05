import React, { useState } from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
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
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/nin");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroSectionWrapper>
        <HeroBgImage src={ninHeroImg} alt="National ID on eCitizen" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>National ID</HeroTag>
            <HeroTitle>
              Verify your
              <br />
              <span>NIN online</span>
              <br />
              in seconds
            </HeroTitle>
            <HeroSubtitle>
              Instant, secure and reliable National Identification Number (NIN)
              verification for individuals and&nbsp;businesses.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                Verify NIN Now <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                See Sample Result <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadge>
              From <span>{getPrice(0) || "KHs600"}</span> per verification
            </PriceBadge>
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="nin"
      />
    </>
  );
};

export default NinHero;
