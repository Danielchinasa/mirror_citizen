import React from "react";
import {
  ComplianceSection as Section,
  ComplianceInner,
  ComplianceText,
  ComplianceTitle,
  ComplianceDesc,
  ComplianceLogos,
  ComplianceBadge,
} from "../../pages/HomePage/HomePage.elements";
import ndprImg from "../../images/ndpr.png";
import nimcImg from "../../images/nidologo.png";
import osiaImg from "../../images/osia.png";
import gdprImg from "../../images/gdpr.png";
import mosipImg from "../../images/mosip.png";

const ComplianceSection = () => {
  return (
    <Section>
      <ComplianceInner>
        <ComplianceText>
          <ComplianceTitle>Trusted. Compliant. Built for you.</ComplianceTitle>
          <ComplianceDesc>Your data is safe with us.</ComplianceDesc>
        </ComplianceText>
        <ComplianceLogos>
          <ComplianceBadge>
            <img src={ndprImg} alt="NDPC" />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={nimcImg} alt="NCMC" style={{ maxHeight: 58 }} />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={osiaImg} alt="OSIA" style={{ maxHeight: 58 }} />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={gdprImg} alt="GDPR" style={{ maxHeight: 58 }} />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={mosipImg} alt="MOSIP" style={{ maxHeight: 58 }} />
          </ComplianceBadge>
        </ComplianceLogos>
      </ComplianceInner>
    </Section>
  );
};

export default ComplianceSection;
