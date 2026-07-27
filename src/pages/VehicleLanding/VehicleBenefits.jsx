import React, { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaHistory,
  FaExclamationTriangle,
  FaThumbsUp,
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

const VehicleBenefits = () => {
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
              {isSw ? "Epuka ununuzi mbaya" : "Avoid bad purchases"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Gundua ajali, wizi, na magari yenye matatizo kabla ya kununua."
                : "Detect accident, theft, and problem vehicles before you buy."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaHistory />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Angalia historia ya umiliki" : "Check ownership history"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Ona wamiliki wa zamani na rekodi za uhamisho kuhakikisha uhalali."
                : "See past owners and transfer records to ensure legitimacy."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaExclamationTriangle />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Tambua viashiria hatari" : "Spot red flags"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Tambua deni, rekodi za wizi, na ripoti mapema."
                : "Identify liens, theft records, and outstanding reports early."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaThumbsUp />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>
              {isSw ? "Nunua kwa ujasiri" : "Buy with confidence"}
            </BenefitTitle>
            <BenefitDesc>
              {isSw
                ? "Fanya maamuzi sahihi na ulinde pesa zako."
                : "Make informed decisions and protect your money."}
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
      </BenefitsGrid>
    </BenefitsWrapper>
  );
};

export default VehicleBenefits;
