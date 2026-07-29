import React from "react";
import styled from "styled-components";
import ndprImg from "../../images/ndpr.png";
import gdprImg from "../../images/gdpr.jpg";
import mosipImg from "../../images/mosip.jpg";

/* ══════════════════════════════════════════
   Styled Components
   ══════════════════════════════════════════ */

const ComplianceSection = styled.section`
  padding: 24px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const ComplianceInner = styled.div`
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

const ComplianceText = styled.div``;

const ComplianceTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: var(--ec-text);
  margin: 0 0 4px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const ComplianceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: var(--ec-text-muted);
  margin: 0;
`;

const ComplianceLogos = styled.div`
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

const ComplianceBadge = styled.div`
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

/* ══════════════════════════════════════════
   Default Logo Data
   ══════════════════════════════════════════ */

const DEFAULT_LOGOS = [
  { src: ndprImg, alt: "NDPC" },
  { src: gdprImg, alt: "GDPR", style: { maxHeight: 48 } },
  { src: mosipImg, alt: "MOSIP", style: { maxHeight: 48 } },
];

/* ══════════════════════════════════════════
   ComplianceBar Component
   ══════════════════════════════════════════ */

const ComplianceBar = ({
  title = "Trusted. Compliant. Built for you.",
  description = "Your data is safe with us.",
  logos = DEFAULT_LOGOS,
}) => {
  return (
    <ComplianceSection>
      <ComplianceInner>
        <ComplianceText>
          <ComplianceTitle>{title}</ComplianceTitle>
          {description && <ComplianceDesc>{description}</ComplianceDesc>}
        </ComplianceText>
        <ComplianceLogos>
          {logos.map((logo, index) => (
            <ComplianceBadge key={index}>
              <img src={logo.src} alt={logo.alt} style={logo.style || {}} />
            </ComplianceBadge>
          ))}
        </ComplianceLogos>
      </ComplianceInner>
    </ComplianceSection>
  );
};

export default ComplianceBar;
