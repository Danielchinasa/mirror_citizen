import React from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import ninSampleImg from "../../images/Verify_NIN_on_ecitizen.jpg";
import { useLocale } from "../../components/LocaleProvider";
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
          <img
            src={ninSampleImg}
            alt="Sample National ID Verification Result"
          />
        </SampleImageWrapper>
        <SampleInfo>
          <SampleTitle>{t("ninSample.title")}</SampleTitle>
          <SampleDesc>{t("ninSample.desc")}</SampleDesc>
          <CheckList>
            <CheckItem>
              <FaCheckCircle /> {t("ninSample.checkItem1")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("ninSample.checkItem2")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("ninSample.checkItem3")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("ninSample.checkItem4")}
            </CheckItem>
            <CheckItem>
              <FaCheckCircle /> {t("ninSample.checkItem5")}
            </CheckItem>
          </CheckList>
          <PrimaryBtn to={verifyLink}>
            {t("ninSample.tryItNow")} <FaArrowRight />
          </PrimaryBtn>
        </SampleInfo>
      </SampleContent>
    </SampleSectionWrapper>
  );
};

export default NinSampleResult;
