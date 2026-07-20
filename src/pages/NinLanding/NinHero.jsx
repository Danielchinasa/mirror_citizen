import React, { useState } from "react";
import {
  FaArrowRight,
  FaEye,
  FaLock,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import ninHeroImg from "../../images/ghana.png";
import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
import avatar3 from "../../images/avatar3.jpg";
import avatar4 from "../../images/avatar4.jpg";
import {
  HeroWrapper,
  HeroStrip,
  HeroBgImage,
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryBtn,
  SecondaryBtn,
  SocialProof,
  AvatarStack,
  TrustIndicators,
  TrustItem,
  TrustIcon,
  TrustLabel,
  TrustTitle,
  TrustDesc,
} from "../HomePage/HomePage.elements";

const NinHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/nin");

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroWrapper>
        <HeroBgImage src={ninHeroImg} alt="e-citizen verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              Verify your Ghana ID online.
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {" "}
                Fast
              </span>
              ,
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {" "}
                secure
              </span>{" "}
              and
              <span
                style={{
                  color: "#FBCB19",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {" "}
                trusted
              </span>
              .
            </HeroTitle>
            <HeroSubtitle>
              Verify Ghana National Identity Card details in real time.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                Verify Ghana ID <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                See Sample Result <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>100% Secure</TrustTitle>
                  <TrustDesc>Your data is protected</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Instand Results</TrustTitle>
                  <TrustDesc>Results in seconds</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>Government Compliant</TrustTitle>
                  <TrustDesc>Official & reliable records</TrustDesc>
                </TrustLabel>
              </TrustItem>
            </TrustIndicators>
            <SocialProof>
              <AvatarStack>
                <img src={avatar1} alt="user" />
                <img src={avatar2} alt="user" />
                <img src={avatar3} alt="user" />
                <img src={avatar4} alt="user" />
              </AvatarStack>
              4.8/5 from 8,000+ reviews
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <HeroStrip aria-hidden="true" />
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="nin"
      />
    </>
  );
};

export default NinHero;
