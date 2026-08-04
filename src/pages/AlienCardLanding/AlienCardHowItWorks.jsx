import React, { useState, useEffect } from "react";
import {
  FaIdCard,
  FaPaperPlane,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";
import styled from "styled-components";

const HowWrapper = styled.section`
  padding: 40px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 30px 30px;
  }
`;

const HowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
`;

const HowLine = styled.div`
  width: 60px;
  height: 2px;
  background: var(--ec-primary);

  @media screen and (max-width: 600px) {
    width: 30px;
  }
`;

const HowTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--ec-text);
  margin: 0;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

const StepsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  flex: 0 0 auto;
  max-width: 250px;
  text-align: center;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 0 20px;
  }
`;

const StepNumberCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--ec-primary);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 6px;
`;

const StepIconBox = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--ec-error-bg);
  border: 1px solid rgba(220, 5, 2, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ec-primary);
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(220, 5, 2, 0.08);
`;

const StepText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
`;

const StepName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--ec-text);
  margin: 0 0 6px;
`;

const StepDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: var(--ec-text-muted);
  line-height: 1.5;
  margin: 0;
`;

const DottedConnector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 96px;
  margin-top: 34px;
  color: var(--ec-primary);
  font-size: 18px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 2px dashed #d1d5db;
  }

  svg {
    flex-shrink: 0;
    margin: 0 2px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const AlienCardHowItWorks = () => {
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
    <HowWrapper id="how-it-works">
      <HowHeader>
        <HowLine />
        <HowTitle>{isSw ? "Inavyofanya kazi" : "How it works"}</HowTitle>
        <HowLine />
      </HowHeader>
      <StepsRow>
        <StepItem>
          <StepNumberCircle>1</StepNumberCircle>
          <StepIconBox>
            <FaIdCard />
          </StepIconBox>
          <StepText>
            <StepName>{isSw ? "Weka maelezo" : "Enter details"}</StepName>
            <StepDesc>
              {isSw
                ? "Toa nambari ya Alien Card na maelezo binafsi."
                : "Provide the Alien Card number and personal details."}
            </StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector>
          <FaArrowRight />
        </DottedConnector>
        <StepItem>
          <StepNumberCircle>2</StepNumberCircle>
          <StepIconBox>
            <FaPaperPlane />
          </StepIconBox>
          <StepText>
            <StepName>{isSw ? "Wasilisha" : "Submit"}</StepName>
            <StepDesc>
              {isSw
                ? "Tunaangalia kwa usalama maelezo yako dhidi ya rekodi rasmi."
                : "We securely check your details against official records."}
            </StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector>
          <FaArrowRight />
        </DottedConnector>
        <StepItem>
          <StepNumberCircle>3</StepNumberCircle>
          <StepIconBox>
            <FaFileAlt />
          </StepIconBox>
          <StepText>
            <StepName>{isSw ? "Pata matokeo" : "Get results"}</StepName>
            <StepDesc>
              {isSw
                ? "Pokea matokeo yako ya uthibitishaji kwa sekunde."
                : "Receive your verification result in seconds."}
            </StepDesc>
          </StepText>
        </StepItem>
      </StepsRow>
    </HowWrapper>
  );
};

export default AlienCardHowItWorks;
