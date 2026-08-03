import React from "react";
import styled from "styled-components";
import { useLocale } from "../LocaleProvider";
import ndprImg from "../../images/ndpr.png";
import gdprImg from "../../images/gdpr.png";
import mosipImg from "../../images/mosip.png";

const Wrapper = styled.section`
  padding: 24px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const Inner = styled.div`
  background: var(--ec-bg-secondary);
  border: 1px solid var(--ec-border);
  border-radius: 14px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px 20px;
    gap: 20px;
  }
`;

const TextGroup = styled.div``;

const Title = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;
`;

const Desc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0;
`;

const LogosRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  min-height: 48px;

  img {
    max-height: 36px;
    width: auto;
    object-fit: contain;
  }
`;

const ComplianceBanner = () => {
  const { t } = useLocale();

  return (
    <Wrapper>
      <Inner>
        <TextGroup>
          <Title>{t("home.compliance.title")}</Title>
          <Desc>{t("home.compliance.desc")}</Desc>
        </TextGroup>
        <LogosRow>
          <Badge>
            <img src={gdprImg} alt="GDPR" style={{ maxHeight: 58 }} />
          </Badge>
          <Badge>
            <img src={mosipImg} alt="MOSIP" style={{ maxHeight: 58 }} />
          </Badge>
        </LogosRow>
      </Inner>
    </Wrapper>
  );
};

export default ComplianceBanner;
