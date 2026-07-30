import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useLocale } from "../../components/LocaleProvider";
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
  const { t } = useLocale();
  const verifyLink = useAuthRedirect("/verify/nin");

  return (
    <SampleSectionWrapper id="sample-result">
      <SampleContent>
        <SampleImageWrapper>
          <img src={ninSampleImg} alt="Sample NNI Verification Result" />
        </SampleImageWrapper>
        <SampleInfo>
          <SampleTitle>{t("sample.ninReportTitle")}</SampleTitle>
          <SampleDesc>
            {t("sample.ninReportDesc")}
          </SampleDesc>
          <CheckList>
            <CheckItem>
              <FaCheckCircle /> {t("sample.feature.fullName")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("sample.feature.dobGender")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("sample.feature.phoneEmail")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("sample.feature.photo")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("sample.feature.address")}
            </CheckItem>
          </CheckList>
          <PrimaryBtn to={verifyLink}>
            {t("sample.tryItNow")} <FaArrowRight />
          </PrimaryBtn>
        </SampleInfo>
      </SampleContent>
    </SampleSectionWrapper>
  );
};

export default NinSampleResult;
