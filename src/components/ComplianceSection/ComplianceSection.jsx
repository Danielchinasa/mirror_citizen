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
import gdprImg from "../../images/gdpr.jpg";
import mosipImg from "../../images/mosip.jpg";

const ComplianceSection = ({ isSw }) => {
  return (
    <Section>
      <ComplianceInner>
        <ComplianceText>
          <ComplianceTitle>
            {isSw
              ? "Unaaminika. Unafuata sheria. Umejengwa kwa ajili yako."
              : "Trusted. Compliant. Built for you."}
          </ComplianceTitle>
          <ComplianceDesc>
            {isSw
              ? "Taarifa zako ziko salama nasi."
              : "Your data is safe with us."}
          </ComplianceDesc>
        </ComplianceText>
        <ComplianceLogos>
          <ComplianceBadge>
            <img src={ndprImg} alt="NDPC" />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={gdprImg} alt="NCMC" style={{ maxHeight: 48 }} />
          </ComplianceBadge>
          <ComplianceBadge>
            <img src={mosipImg} alt="OSIA" style={{ maxHeight: 48 }} />
          </ComplianceBadge>
        </ComplianceLogos>
      </ComplianceInner>
    </Section>
  );
};

export default ComplianceSection;
