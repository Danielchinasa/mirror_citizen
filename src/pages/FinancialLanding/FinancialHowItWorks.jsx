import React from "react";
import { FaIdCard, FaUpload, FaShieldAlt, FaArrowRight } from "react-icons/fa";
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
  background: #02831c;

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
  background: #02831c;
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
  background: #f0fdf4;
  border: 1px solid rgba(2, 131, 28, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #02831c;
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(2, 131, 28, 0.08);
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
  color: #1a1a1a;
  margin: 0 0 6px;
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
  justify-content: center;
  gap: 8px;
  min-width: 96px;
  margin-top: 34px;
  color: #02831c;
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

const FinancialHowItWorks = () => {
  return (
    <HowWrapper id="how-it-works">
      <HowHeader>
        <HowLine />
        <HowTitle>How to check a credit profile</HowTitle>
        <HowLine />
      </HowHeader>
      <StepsRow>
        <StepItem>
          <StepNumberCircle>1</StepNumberCircle>
          <StepIconBox>
            <FaIdCard />
          </StepIconBox>
          <StepText>
            <StepName>Choose a service</StepName>
            <StepDesc>Select National ID or VIN Verification.</StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector>
          <FaArrowRight />
        </DottedConnector>
        <StepItem>
          <StepNumberCircle>2</StepNumberCircle>
          <StepIconBox>
            <FaUpload />
          </StepIconBox>
          <StepText>
            <StepName>Submit details</StepName>
            <StepDesc>Enter required information securely.</StepDesc>
          </StepText>
        </StepItem>
        <DottedConnector>
          <FaArrowRight />
        </DottedConnector>
        <StepItem>
          <StepNumberCircle>3</StepNumberCircle>
          <StepIconBox>
            <FaShieldAlt />
          </StepIconBox>
          <StepText>
            <StepName>Get results</StepName>
            <StepDesc>Receive instant verification results.</StepDesc>
          </StepText>
        </StepItem>
      </StepsRow>
    </HowWrapper>
  );
};

export default FinancialHowItWorks;
