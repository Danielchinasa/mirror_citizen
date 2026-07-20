import React, { useState, useEffect } from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import vehicleHeroImg from "../../images/kenya_vehicle.png";
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
} from "../HomePage/HomePage.elements";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const VehicleHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const [language, setLanguage] = useState(getLanguage);
  const verifyLink = useAuthRedirect("/verify/vehicle");

  const isSw = language === "SW";

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  const redHighlight = {
    color: "#D80111",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };

  return (
    <>
      <HeroWrapper>
        <HeroBgImage src={vehicleHeroImg} alt="Vehicle Verification" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              {isSw ? "Ya gari " : "Check a "}
              <span style={redHighlight}>
                {isSw ? "Kagua VIN" : "vehicle VIN"}
              </span>
              {isSw ? " kabla ya kununua." : " in Kenya before you buy."}
            </HeroTitle>
            <HeroSubtitle>
              {isSw
                ? "Thibitisha utambulisho wa gari papo hapo, hakiki maelezo, na epuka makosa ya gharama kubwa."
                : "Instantly verify a vehicle's identity, confirm details, and avoid costly mistakes."}
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                {isSw ? "Kagua Gari Sasa" : "Check Vehicle Now"}{" "}
                <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#" onClick={openSampleResult}>
                <FaEye /> {isSw ? "Ona Mfano wa Matokeo" : "See Sample Result"}
              </SecondaryBtn>
            </HeroButtons>

            <SocialProof>
              <AvatarStack>
                <img src={avatar1} alt="user" />
                <img src={avatar2} alt="user" />
                <img src={avatar3} alt="user" />
                <img src={avatar4} alt="user" />
              </AvatarStack>
              {isSw
                ? "Jiunge na Wakenya zaidi ya 500,000 wanaoamini e-raia"
                : "Join 500,000+ Kenyans who trust e-raia"}
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <HeroStrip aria-hidden="true" />

      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="vehicle"
      />
    </>
  );
};

export default VehicleHero;
