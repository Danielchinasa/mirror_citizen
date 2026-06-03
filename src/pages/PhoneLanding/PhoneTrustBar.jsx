import React from "react";
import { FaLock, FaBolt, FaCheckCircle, FaClock } from "react-icons/fa";
import {
  TrustBarWrapper,
  TrustBarInner,
  TrustItem,
  TrustIconCircle,
  TrustText,
  TrustTitle,
  TrustDesc,
} from "./PhoneLanding.elements";

const PhoneTrustBar = () => {
  return (
    <TrustBarWrapper>
      <TrustBarInner>
        <TrustItem>
          <TrustIconCircle>
            <FaLock />
          </TrustIconCircle>
          <TrustText>
            <TrustTitle>Secure</TrustTitle>
            <TrustDesc>Your data is protected</TrustDesc>
          </TrustText>
        </TrustItem>
        <TrustItem>
          <TrustIconCircle>
            <FaBolt />
          </TrustIconCircle>
          <TrustText>
            <TrustTitle>Fast</TrustTitle>
            <TrustDesc>Results in seconds</TrustDesc>
          </TrustText>
        </TrustItem>
        <TrustItem>
          <TrustIconCircle>
            <FaCheckCircle />
          </TrustIconCircle>
          <TrustText>
            <TrustTitle>Compliant</TrustTitle>
            <TrustDesc>NDPC & NIMC Aligned</TrustDesc>
          </TrustText>
        </TrustItem>
        <TrustItem>
          <TrustIconCircle>
            <FaClock />
          </TrustIconCircle>
          <TrustText>
            <TrustTitle>Available 24/7</TrustTitle>
            <TrustDesc>Anytime, anywhere</TrustDesc>
          </TrustText>
        </TrustItem>
      </TrustBarInner>
    </TrustBarWrapper>
  );
};

export default PhoneTrustBar;
