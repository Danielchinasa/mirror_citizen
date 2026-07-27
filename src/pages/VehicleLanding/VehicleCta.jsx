import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import styled from "styled-components";

const CtaWrapper = styled.section`
  background: var(--ec-error-bg);
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
  background: var(--ec-cta-shield-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 30px;
    color: var(--ec-primary);
  }
`;

const CtaContent = styled.div`
  flex: 1;
`;

const CtaTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const CtaDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-secondary);
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
  background: var(--ec-primary);
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 36px;
  border-radius: 10px;
  border: 2px solid var(--ec-primary);
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
  color: var(--ec-text-secondary);

  svg {
    color: var(--ec-primary);
    font-size: 14px;
  }
`;

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const VehicleCta = () => {
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

  const verifyLink = useAuthRedirect("/verify/vehicle");

  return (
    <CtaWrapper>
      <CtaInner>
        <CtaShield>
          <FaShieldAlt />
        </CtaShield>
        <CtaContent>
          <CtaTitle>
            {isSw
              ? "Uko tayari kuthibitisha gari?"
              : "Ready to verify a vehicle?"}
          </CtaTitle>
          <CtaDesc>
            {isSw
              ? "Jiunge na maelfu ya wanunuzi wenye busara wanaothibitisha kabla ya kununua ili kuepuka ulaghai na kufanya maamuzi kwa ujasiri."
              : "Join thousands of smart buyers who verify before they buy to avoid fraud and make confident decisions."}
          </CtaDesc>
        </CtaContent>
        <CtaRight>
          <CtaButton to={verifyLink}>
            {isSw ? "Thibitisha Gari Sasa" : "Verify Vehicle Now"}{" "}
            <FaArrowRight />
          </CtaButton>
          <CtaPrice>
            <FaCheckCircle />{" "}
            {isSw ? "Salama, Haraka, Inayoaminika" : "Secure, Fast, Reliable"}
          </CtaPrice>
        </CtaRight>
      </CtaInner>
    </CtaWrapper>
  );
};

export default VehicleCta;
