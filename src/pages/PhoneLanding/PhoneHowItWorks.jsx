import React from "react";
import { FaMobileAlt, FaWallet, FaCheckCircle } from "react-icons/fa";
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
  background: #09c93a;

  @media screen and (max-width: 600px) {
    width: 30px;
  }
`;

const HowTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1a1a1a;
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
  gap: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 0 0 auto;
  max-width: 280px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 0 20px;
  }
`;

const StepNumberCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #09c93a;
  color: #09c93a;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 18px;
  flex-shrink: 0;
`;

const StepText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
  margin: 0 0 4px;
`;

const StepDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  margin: 0;
`;

const DottedConnector = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-top: 18px;

  &::before {
    content: "";
    width: 60px;
    border-top: 2px dashed #ccc;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const PhoneHowItWorks = () => {
  return (
    <HowWrapper id="how-it-works">
      <HowHeader>
        <HowLine />
        <HowTitle>How to verify a phone number</HowTitle>
        <HowLine />
      </HowHeader>
      <StepsRow>
        <StepItem>
          <StepNumberCircle>1</StepNumberCircle>
          <StepIconBox>
            <FaMobileAlt />
          </StepIconBox>
          <StepText>
            <StepName>Enter phone number</StepName>
            <StepDesc>Provide the phone number you want to verify.</StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector />
        <StepItem>
          <StepNumberCircle>2</StepNumberCircle>
          <StepIconBox>
            <FaWallet />
          </StepIconBox>
          <StepText>
            <StepName>Make payment</StepName>
            <StepDesc>Secure payment from as low as N800.</StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector />
        <StepItem>
          <StepNumberCircle>3</StepNumberCircle>
          <StepIconBox>
            <FaCheckCircle />
          </StepIconBox>
          <StepText>
            <StepName>View result instantly</StepName>
            <StepDesc>Get verification result in seconds.</StepDesc>
          </StepText>
        </StepItem>
      </StepsRow>
    </HowWrapper>
  );
};

export default PhoneHowItWorks;
