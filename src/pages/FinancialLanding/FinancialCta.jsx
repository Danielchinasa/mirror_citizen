import React from "react";
import { FaArrowRight, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import styled from "styled-components";

const CtaWrapper = styled.section`
  background: #fef2f2;
  padding: 40px 50px;

  @media screen and (max-width: 768px) {
    padding: 30px 30px;
  }
`;

const CtaInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CtaShield = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 30px;
    color: #dd0201;
  }
`;

const CtaContent = styled.div`
  flex: 1;
`;

const CtaTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #1a1a1a;
  margin: 0 0 4px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const CtaDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0;
  max-width: 480px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const CtaRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const CtaButton = styled(Link)`
  background: #dd0201;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 36px;
  border-radius: 10px;
  border: 2px solid #dd0201;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease-out;
  white-space: nowrap;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #ff4d4f;
    border-color: #ff4d4f;
    color: #fff;
  }
`;

const CtaPrice = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  color: #555;

  svg {
    color: #dd0201;
    font-size: 14px;
  }

  strong {
    font-weight: 700;
    text-decoration: line-through;
  }
`;

const FinancialCta = () => {
  const verifyLink = useAuthRedirect("/verify/bvn");

  return (
    <CtaWrapper>
      <CtaInner>
        <CtaShield>
          <FaShieldAlt />
        </CtaShield>
        <CtaContent>
          <CtaTitle>Ready to check a credit profile?</CtaTitle>
          <CtaDesc>
            Get a secure, BVN-based credit profile in seconds and make better
            decisions with confidence.
          </CtaDesc>
        </CtaContent>
        <CtaRight>
          <CtaButton to={verifyLink}>
            Check Credit Now <FaArrowRight />
          </CtaButton>
        </CtaRight>
      </CtaInner>
    </CtaWrapper>
  );
};

export default FinancialCta;
