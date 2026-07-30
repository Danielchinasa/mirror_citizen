import React, { useState } from "react";
import {
  FaArrowRight,
  FaEye,
  FaBolt,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import ninHeroImg from "../../images/nin_verification_hero2.png";
import {
  HeroWrapper,
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
  TrustIndicators,
  TrustItem,
  TrustIcon,
  TrustLabel,
  TrustTitle,
  TrustDesc,
  SocialProof,
  AvatarStack,
} from "../HomePage/HomePage.elements";
import heroImg from "../../images/cote_divoire.png";

import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
import avatar3 from "../../images/avatar3.jpg";
import avatar4 from "../../images/avatar4.jpg";
import { useLocale } from "../../components/LocaleProvider";

const NinHero = () => {
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/nin");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };
  const { t } = useLocale();

  const highlightStyle = {
    color: "#FD7A00",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
  };

  return (
    <>
      <HeroWrapper>
        <HeroBgImage src={heroImg} alt="e-citoyen verification platform" />
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              {t("nin.hero.titlePrefix")}
              <br />
              <span style={highlightStyle}>{t("nin.hero.word1")}</span>,{" "}
              <span style={highlightStyle}>{t("nin.hero.word2")}</span>{" "}
              {t("nin.hero.and")}{" "}
              <span style={highlightStyle}>{t("nin.hero.word3")}</span>.
            </HeroTitle>
            <HeroSubtitle>{t("nin.hero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("home.hero.verifyNationalId")} <FaArrowRight />
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
                  <TrustTitle>{t("home.trust.secureTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.secureDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("home.trust.instantTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.instantDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("home.trust.compliantTitle")}</TrustTitle>
                  <TrustDesc>{t("home.trust.compliantDesc")}</TrustDesc>
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
              {t("home.socialProof")}
            </SocialProof>
          </HeroContent>
        </HeroContainer>
      </HeroWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="nin"
      />
    </>
  );
};

export default NinHero;
