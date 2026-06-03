import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaInfoCircle,
  FaBuilding,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import styled from "styled-components";

const SectionWrapper = styled.section`
  padding: 40px 50px 60px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 30px 20px 40px;
  }
`;

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Login Card ─── */

const LoginCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 36px 32px;

  @media screen and (max-width: 768px) {
    padding: 28px 20px;
  }
`;

const LoginCardTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #1a1a1a;
  margin: 0 0 4px;
`;

const LoginCardSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #777;
  margin: 0 0 24px;
`;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SSOCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SSOButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: #f9fafb;
  }

  svg {
    font-size: 20px;
  }
`;

const Divider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #999;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
`;

const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormLabel = styled.label`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 2px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #333;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #09c93a;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #555;
  cursor: pointer;
`;

const ForgotLink = styled(Link)`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #09c93a;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  background: #09c93a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #16ef4d;
    color: #fff;
  }
`;

const RegisterText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
  text-align: center;
  margin: 12px 0 0;

  a {
    color: #09c93a;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ─── Sample Result Card ─── */

const SampleCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 36px 32px;

  @media screen and (max-width: 768px) {
    padding: 28px 20px;
  }
`;

const SampleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

const SampleCardTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #1a1a1a;
  margin: 0;
`;

const SampleBadge = styled.span`
  display: inline-block;
  background: #fff;
  border: 1px solid #09c93a;
  color: #09c93a;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 16px;
  white-space: nowrap;
`;

const SampleCardSub = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #777;
  margin: 0 0 20px;
`;

const ResultCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;

  @media screen and (max-width: 480px) {
    padding: 16px;
  }
`;

const ResultTop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CompanyIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #e5e7eb;
  background: #e6f9ed;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 28px;
    color: #09c93a;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CompanyName = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
`;

const CompanyRc = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #777;
`;

const VerifiedBadge = styled.span`
  color: #09c93a;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #e6f9ed;
  padding: 3px 10px;
  border-radius: 16px;
  width: fit-content;
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const ScoreLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
`;

const ScoreCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #09c93a;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultDivider = styled.div`
  border-top: 1px solid #e5e7eb;
  margin: 16px 0;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px 20px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ResultField = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultLabel = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  color: #999;
`;

const ResultValue = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #1a1a1a;
`;

const ResultFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  margin-top: 16px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: #999;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const ResultDisclaimer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: #3b82f6;
  margin-top: 12px;

  svg {
    font-size: 14px;
    color: #3b82f6;
  }
`;

const BusinessLoginSample = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <SectionWrapper id="sample-result">
      <TwoColGrid>
        {/* Login Card */}
        <LoginCard>
          <LoginCardTitle>Login / Continue</LoginCardTitle>
          <LoginCardSub>
            Sign in or continue to start your verification.
          </LoginCardSub>
          <LoginLayout>
            <SSOCol>
              <SSOButton type="button">
                <FcGoogle /> Continue with Google
              </SSOButton>
              <SSOButton type="button">
                <FaFacebook color="#1877F2" /> Continue with Facebook
              </SSOButton>
            </SSOCol>
            <Divider>OR</Divider>
            <FormCol>
              <div>
                <FormLabel>Email address</FormLabel>
                <FormInput type="email" placeholder="Enter your email" />
              </div>
              <div>
                <FormLabel>Password</FormLabel>
                <PasswordWrapper>
                  <FormInput
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </PasswordWrapper>
              </div>
              <FormRow>
                <RememberLabel>
                  <input type="checkbox" /> Remember me
                </RememberLabel>
                <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
              </FormRow>
              <LoginBtn to="/login">Login</LoginBtn>
              <RegisterText>
                Don't have an account? <Link to="/sign-up">Register here</Link>
              </RegisterText>
            </FormCol>
          </LoginLayout>
        </LoginCard>

        {/* Sample Result Card */}
        <SampleCard>
          <SampleHeader>
            <SampleCardTitle>Sample result</SampleCardTitle>
            <SampleBadge>This is a sample only</SampleBadge>
          </SampleHeader>
          <SampleCardSub>
            See an example of a company verification result.
          </SampleCardSub>
          <ResultCard>
            <ResultTop>
              <CompanyIcon>
                <FaBuilding />
              </CompanyIcon>
              <CompanyInfo>
                <CompanyName>ADEBAYO GLOBAL SERVICES LTD</CompanyName>
                <CompanyRc>RC 1234567</CompanyRc>
                <VerifiedBadge>
                  ACTIVE / VERIFIED <FaCheckCircle />
                </VerifiedBadge>
              </CompanyInfo>
              <ScoreSection>
                <ScoreLabel>Confidence Score</ScoreLabel>
                <ScoreCircle>98%</ScoreCircle>
              </ScoreSection>
            </ResultTop>
            <ResultFooter style={{ marginTop: 0 }}>
              <span>Verified on 25 May 2025, 12:35 PM</span>
              <span>Ref: EC20250525123545ABCD</span>
            </ResultFooter>
            <ResultDivider />
            <ResultGrid>
              <ResultField>
                <ResultLabel>Company Type</ResultLabel>
                <ResultValue>Private Limited Liability</ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Registered Address</ResultLabel>
                <ResultValue>
                  12 Adeola Odeku Street, Victoria Island, Lagos
                </ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Directors</ResultLabel>
                <ResultValue>3</ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Date Incorporated</ResultLabel>
                <ResultValue>12 Feb 2019</ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Status</ResultLabel>
                <ResultValue>Active</ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Shareholders</ResultLabel>
                <ResultValue>2</ResultValue>
              </ResultField>
              <ResultField>
                <ResultLabel>Nature of Business</ResultLabel>
                <ResultValue>General Contract Merchandise</ResultValue>
              </ResultField>
            </ResultGrid>
          </ResultCard>
          <ResultDisclaimer>
            <FaInfoCircle />
            Results are based on data available at the time of verification.
          </ResultDisclaimer>
        </SampleCard>
      </TwoColGrid>
    </SectionWrapper>
  );
};

export default BusinessLoginSample;
