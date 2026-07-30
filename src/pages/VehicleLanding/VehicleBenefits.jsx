import React from "react";
import {
  FaShieldAlt,
  FaHistory,
  FaExclamationTriangle,
  FaThumbsUp,
} from "react-icons/fa";
import styled from "styled-components";
import { useLocale } from "../../components/LocaleProvider";

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
  background: #fef2f2;
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
  color: #DD0201;
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
  color: #1a1a1a;
  margin: 0 0 4px;
`;

const BenefitDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  margin: 0;
`;

const VehicleBenefits = () => {
  const { t } = useLocale();

  return (
    <BenefitsWrapper>
      <BenefitsGrid>
        <BenefitCard>
          <BenefitIcon>
            <FaShieldAlt />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>{t("vehicleBenefits.title1")}</BenefitTitle>
            <BenefitDesc>{t("vehicleBenefits.desc1")}</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaHistory />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>{t("vehicleBenefits.title2")}</BenefitTitle>
            <BenefitDesc>{t("vehicleBenefits.desc2")}</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaExclamationTriangle />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>{t("vehicleBenefits.title3")}</BenefitTitle>
            <BenefitDesc>{t("vehicleBenefits.desc3")}</BenefitDesc>
          </BenefitText>
        </BenefitCard>
        <BenefitCard>
          <BenefitIcon>
            <FaThumbsUp />
          </BenefitIcon>
          <BenefitText>
            <BenefitTitle>{t("vehicleBenefits.title4")}</BenefitTitle>
            <BenefitDesc>{t("vehicleBenefits.desc4")}</BenefitDesc>
          </BenefitText>
        </BenefitCard>
      </BenefitsGrid>
    </BenefitsWrapper>
  );
};

export default VehicleBenefits;
