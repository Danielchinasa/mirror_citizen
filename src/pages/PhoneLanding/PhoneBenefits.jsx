import React from "react";
import { FaShieldAlt, FaBolt, FaUserPlus, FaChartBar } from "react-icons/fa";
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
  background: var(--ec-bg-card-alt);
  border-radius: 12px;
  padding: 28px 22px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px var(--ec-shadow);
  }
`;

const BenefitIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--ec-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
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

const PhoneBenefits = () => {
  return (
    <BenefitsWrapper>
      <BenefitsGrid>
        <BenefitCard>
          <BenefitIcon>
            <FaChartBar />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>Trusted results</BenefitTitle>
            <BenefitDesc>Accurate, reliable data you can count on.</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaBolt />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>Verify faster</BenefitTitle>
            <BenefitDesc>Get accurate results in seconds.</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaUserPlus />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>Improve onboarding</BenefitTitle>
            <BenefitDesc>Onboard users quickly with confidence.</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaShieldAlt />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>Reduce fraud</BenefitTitle>
            <BenefitDesc>
              Detect and prevent fake or risky phone numbers.
            </BenefitDesc>
          </BenefitText>
        </BenefitCard>
      </BenefitsGrid>
    </BenefitsWrapper>
  );
};

export default PhoneBenefits;
