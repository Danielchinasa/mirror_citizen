import React from "react";
import styled from "styled-components";
import ndprImg from "../../images/ndpr.png";
import nimcImg from "../../images/nidologo.png";
import osiaImg from "../../images/osia.png";

const ComplianceWrapper = styled.section`
  padding: 20px 50px;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 16px 30px;
  }
`;

const ComplianceInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 36px 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 28px 24px;
    gap: 24px;
  }
`;

const ComplianceText = styled.div``;

const ComplianceTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #1a1a1a;
  margin: 0 0 6px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const ComplianceDesc = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #777;
  margin: 0;
`;

const LogosRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    justify-content: center;
    gap: 16px;
  }
`;

const LogoBadge = styled.div`
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 50px;
  background: #fff;

  img {
    max-height: 36px;
    width: auto;
    object-fit: contain;
  }
`;

const VehicleCompliance = () => {
  return (
    <ComplianceWrapper>
      <ComplianceInner>
        <ComplianceText>
          <ComplianceTitle>Trusted. Secure. Compliant.</ComplianceTitle>
          <ComplianceDesc>
            We adhere to the highest standards for data protection and vehicle
            verification.
          </ComplianceDesc>
        </ComplianceText>
        <LogosRow>
          <LogoBadge>
            <img src={ndprImg} alt="NDPC" />
          </LogoBadge>
          <LogoBadge>
            <img src={nimcImg} alt="NIMC" style={{ maxHeight: "52px" }} />
          </LogoBadge>
          <LogoBadge>
            <img src={osiaImg} alt="OSIA" style={{ maxHeight: "52px" }} />
          </LogoBadge>
        </LogosRow>
      </ComplianceInner>
    </ComplianceWrapper>
  );
};

export default VehicleCompliance;
