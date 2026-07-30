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
import vehicleHeroImg from "../../images/uganda_vehicle.png";
import avatar1 from "../../images/avatar1.jpg";
import avatar2 from "../../images/avatar2.jpg";
import avatar3 from "../../images/avatar3.jpg";
import avatar4 from "../../images/avatar4.jpg";
import { useLocale } from "../../components/LocaleProvider";
import {
  HeroWrapper,
  HeroStrip,
  HeroBgImage,
  HeroContainer,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  PrimaryBtn,
  SecondaryBtn,
  TrustIndicators,
  TrustItem,
  TrustIcon,
  TrustLabel,
  TrustTitle,
  TrustDesc,
  SocialProof,
  AvatarStack,
} from "../HomePage/HomePage.elements";

const VehicleHero = () => {
  const { t } = useLocale();
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/vehicle");

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroWrapper>
        <HeroBgImage
          src={vehicleHeroImg}
          alt="Vehicle Verification on eCitizen"
        />
        <HeroContainer>
          <HeroContent>
            <HeroTitle
              dangerouslySetInnerHTML={{ __html: t("vehicleHero.title") }}
            />
            <HeroSubtitle>{t("vehicleHero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                {t("vehicleHero.checkVinBtn")} <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                {t("vehicleHero.seeSampleBtn")} <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <TrustIndicators>
              <TrustItem>
                <TrustIcon>
                  <FaLock />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("trust.secureTitle")}</TrustTitle>
                  <TrustDesc>{t("trust.secureDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaBolt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("trust.instantTitle")}</TrustTitle>
                  <TrustDesc>{t("trust.instantDesc")}</TrustDesc>
                </TrustLabel>
              </TrustItem>
              <TrustItem>
                <TrustIcon>
                  <FaShieldAlt />
                </TrustIcon>
                <TrustLabel>
                  <TrustTitle>{t("trust.compliantTitle")}</TrustTitle>
                  <TrustDesc>{t("trust.compliantDesc")}</TrustDesc>
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
              {t("vehicleHero.trustedBy")}
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
