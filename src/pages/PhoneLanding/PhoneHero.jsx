import React, { useState } from "react";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import heroImg from "../../images/phone_number_verification.png";
import { useLocale } from "../../components/LocaleProvider";
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
  const { t } = useLocale();
  const [showSampleResult, setShowSampleResult] = useState(false);
  const verifyLink = useAuthRedirect("/verify/phone");
  const { getPrice } = useServicePrices();

  const openSampleResult = (event) => {
    event.preventDefault();
    setShowSampleResult(true);
  };

  return (
    <>
      <HeroSectionWrapper>
        <HeroBgImage src={heroImg} alt="Phone Number Verification on eCitizen" />
        <HeroContainer>
          <HeroContent>
            <HeroTag>{t("phoneHero.tag")}</HeroTag>
            <HeroTitle
              dangerouslySetInnerHTML={{ __html: t("phoneHero.title") }}
            />
            <HeroSubtitle>{t("phoneHero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                {t("phoneHero.verifyBtn")} <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                {t("phoneHero.seeSampleBtn")} <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadge>
              {t("phoneHero.priceLabel", {
                price: getPrice(9) || "₦800",
              })}
            </PriceBadge>
            <HeroMobileImage
              src={heroImg}
              alt="Phone Number Verification on eCitizen"
            />
          </HeroContent>
        </HeroContainer>
      </HeroSectionWrapper>
      <SampleResultPopup
        isOpen={showSampleResult}
        onClose={() => setShowSampleResult(false)}
        type="phone"
      />
    </>
  );
};

export default PhoneHero;
