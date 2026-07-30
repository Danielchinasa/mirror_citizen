import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaEye } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useServicePrices from "../../hooks/useServicePrices";
import SampleResultPopup from "../../components/SampleResultPopup/SampleResultPopup";
import heroImg from "../../images/credit_profile.png";
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
  const { t } = useLocale();
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
            <HeroTag>{t("financialHero.tag")}</HeroTag>
            <HeroTitle
              dangerouslySetInnerHTML={{ __html: t("financialHero.title") }}
            />
            <HeroSubtitle>{t("financialHero.subtitle")}</HeroSubtitle>
            <HeroButtons>
              <PrimaryBtn to={verifyLink}>
                {t("financialHero.checkBtn")} <FaArrowRight />
              </PrimaryBtn>
              <SecondaryBtn href="#sample-result" onClick={openSampleResult}>
                {t("financialHero.seeSampleBtn")} <FaEye />
              </SecondaryBtn>
            </HeroButtons>
            <PriceBadge>
              {t("financialHero.priceLabel", {
                price: getPrice(4) || "₦1,500",
              })}
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
