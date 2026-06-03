import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
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
  return (
    <SampleSectionWrapper id="sample-result">
      <SampleContent>
        <SampleImageWrapper>
          <img src={ninSampleImg} alt="Sample NIN Verification Result" />
        </SampleImageWrapper>
        <SampleInfo>
          <SampleTitle>What You Get in a NIN Report</SampleTitle>
          <SampleDesc>
            Each NIN verification returns comprehensive identity details sourced
            from official records, helping you make informed decisions.
          </SampleDesc>
          <CheckList>
            <CheckItem>
              <FaCheckCircle /> Full name of the NIN holder
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
          <PrimaryBtn to="/login">
            Try It Now <FaArrowRight />
          </PrimaryBtn>
        </SampleInfo>
      </SampleContent>
    </SampleSectionWrapper>
  );
};

export default NinSampleResult;
