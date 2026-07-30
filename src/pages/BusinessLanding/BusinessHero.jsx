import React, { useState } from "react";
import { FaArrowRight, FaEye, FaCheckCircle } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import heroImg from "../../images/business_verification2.png";
import { useLocale } from "../../components/LocaleProvider";
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
  PriceBadgesRow,
  PriceBadge,
  HeroChecks,
  HeroCheck,
} from "./BusinessLanding.elements";

const BusinessHero = () => {
  const { t } = useLocale();
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/business");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroSectionWrapper>
        <HeroBgImage src={heroImg} alt="Business Verification on eCitizen" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>{t("businessHero.tag")}</HeroTag>
            <HeroTitle
              dangerouslySetInnerHTML={{ __html: t("businessHero.title") }}
            />
            <HeroSubtitle>{t("businessHero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                {t("businessHero.verifyBtn")} <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                {t("businessHero.seeSampleBtn")} <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadgesRow>
              <PriceBadge>
                {t("businessHero.priceBasic", {
                  price: getPrice(2) || "₦100",
                })}
              </PriceBadge>
              <PriceBadge>
                {t("businessHero.priceAdvanced", {
                  price: getPrice(3) || "₦800",
                })}
              </PriceBadge>
            </PriceBadgesRow>
            <HeroChecks>
              <HeroCheck>
                <FaCheckCircle /> {t("businessHero.check1")}
              </HeroCheck>
              <HeroCheck>
                <FaCheckCircle /> {t("businessHero.check2")}
              </HeroCheck>
              <HeroCheck>
                <FaCheckCircle /> {t("businessHero.check3")}
              </HeroCheck>
            </HeroChecks>
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="business"
      />
    </>
  );
};

export default BusinessHero;
