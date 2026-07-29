import React, { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaChartBar,
} from "react-icons/fa";
import styled from "styled-components";

const BenefitsWrapper = styled.section`
  padding: 20px 50px 30px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 16px 20px 20px;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background: var(--ec-error-bg);
  border-radius: 12px;
  padding: 28px 22px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

const BenefitIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fdecec;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ec-primary);
  font-size: 18px;
  flex-shrink: 0;
`;

const BenefitText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BenefitTitle = styled.h4`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: var(--ec-text);
  margin: 0 0 4px;
`;

const BenefitDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  line-height: 1.5;
  margin: 0;
`;

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const NinBenefits = () => {
  const [language, setLanguage] = useState(getLanguage);
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

  return (
    <BenefitsWrapper>
      <BenefitsGrid>
        <BenefitCard>
          <BenefitIcon>
            <FaShieldAlt />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Thibitisha kwa ujasiri" : "Verify with confidence"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Pata taarifa sahihi na za sasa za Kitambulisho cha Taifa."
                : "Access accurate and up-to-date National ID information."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaCheckCircle />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Punguza ulaghai na hatari" : "Reduce fraud & risk"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Thibitisha utambulisho na jenga uaminifu katika kila muamala."
                : "Confirm identity and build trust in every transaction."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaClock />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Okoa muda na rasilimali" : "Save time & resources"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Otomatiki uthibitishaji na zingatia mambo muhimu."
                : "Automate verification and focus on what matters."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaChartBar />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Imejengwa kwa kiwango" : "Built for scale"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Inafaa kwa biashara, majukwaa na watu binafsi."
                : "Perfect for businesses, platforms and individuals."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
      </BenefitsGrid>
    </BenefitsWrapper>
  );
};

export default NinBenefits;
