import React from "react";
import { FaBolt, FaShieldAlt, FaLock } from "react-icons/fa";
import {
  FeaturesSectionWrapper,
  FeaturesInner,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDesc,
} from "./NinLanding.elements";

const NinFeatures = () => {
  return (
    <FeaturesSectionWrapper>
      <FeaturesInner>
        <SectionTitle>
          Why Choose eCitizen for Ghana ID Verification?
        </SectionTitle>
        <SectionSubtitle>
          Trusted by thousands of individuals and businesses across Nigeria
        </SectionSubtitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaBolt />
            </FeatureIcon>
            <FeatureTitle>Instant Results</FeatureTitle>
            <FeatureDesc>
              Get Ghana ID verification results in seconds, not hours. Our
              platform connects directly to official databases for real-time
              lookups.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureTitle>NDPR Compliant</FeatureTitle>
            <FeatureDesc>
              Your data is handled in full compliance with the Nigeria Data
              Protection Regulation. We never store sensitive information.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaLock />
            </FeatureIcon>
            <FeatureTitle>Secure & Encrypted</FeatureTitle>
            <FeatureDesc>
              All data is encrypted end-to-end. Your verification requests and
              results are protected with bank-grade security.
            </FeatureDesc>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesInner>
    </FeaturesSectionWrapper>
  );
};

export default NinFeatures;
