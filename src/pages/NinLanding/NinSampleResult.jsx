import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import ninSampleImg from "../../images/Verify_NIN_on_ecitizen.jpg";
import {
  SampleSectionWrapper,
  SampleContent,
  SampleImageWrapper,
  SampleInfo,
  SampleTitle,
  SampleDesc,
  CheckList,
  CheckItem,
  PrimaryBtn,
} from "./NinLanding.elements";

const NinSampleResult = () => {
  const verifyLink = useAuthRedirect("/verify/nin");

  return (
    <SampleSectionWrapper id="sample-result">
      <SampleContent>
        <SampleImageWrapper>
          <img src={ninSampleImg} alt="Sample National ID Result" />
        </SampleImageWrapper>
        <SampleInfo>
          <SampleTitle>What You Get in a National ID Report</SampleTitle>
          <SampleDesc>
            Each National ID returns comprehensive identity details sourced from
            official records, helping you make informed decisions.
          </SampleDesc>
          <CheckList>
            <CheckItem>
              <FaCheckCircle /> Full name of the National ID holder
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> Date of birth and gender
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> Phone number and email on record
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> Photograph for visual confirmation
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> Address and state of origin
            </CheckItem>
          </CheckList>
          <PrimaryBtn to={verifyLink}>
            Try It Now <FaArrowRight />
          </PrimaryBtn>
        </SampleInfo>
      </SampleContent>
    </SampleSectionWrapper>
  );
};

export default NinSampleResult;
