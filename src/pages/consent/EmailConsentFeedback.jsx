import React, { useEffect, useState } from "react";
import { Alert, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { apiPost } from "../../apiUtils";

const Page = styled.main`
  min-height: 62vh;
  padding: 72px 24px;
  background: var(--ec-bg, #f7f8fa);
`;

const Panel = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 56px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  background: var(--ec-bg, #ffffff);
  color: var(--ec-text, #14213d);

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: var(--ec-text, #344138);
  font-family: "Poppins", sans-serif;
  font-size: 34px;
  font-weight: 700;
`;

const Copy = styled.p`
  margin-bottom: 28px;
  font-size: 18px;
  line-height: 1.65;
`;

const Form = styled.form`
  display: grid;
  max-width: 360px;
  gap: 16px;
`;

const Code = styled.span`
  font-weight: 700;
  letter-spacing: 1px;
`;

const getCode = (search) => new URLSearchParams(search).get("code") || "";
const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

function EmailConsentFeedback({ match, location }) {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const action = match.params.action;
  const code = getCode(location.search);
  const isDecline = action === "decline";
  const isAccept = action === "accept";
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  const t = (en, sw) => (isSw ? sw : en);

  useEffect(() => {
    if (!isDecline || !code) return;

    apiPost("/africa/consent/respond", { code, decision: "DECLINE" }).catch(
      (requestError) => {
        console.error("Unable to record declined consent:", requestError);
      },
    );
  }, [code, isDecline]);

  const submitApproval = async (event) => {
    event.preventDefault();
    setError("");

    if (!code) {
      setError(
        t(
          "This consent link is missing its consent code.",
          "Kiungo hiki cha idhini hakina msimbo wake wa idhini.",
        ),
      );
      return;
    }

    if (!dateOfBirth) {
      setError(
        t(
          "Enter your date of birth to approve this consent request.",
          "Ingiza tarehe yako ya kuzaliwa ili kukubali ombi la idhini.",
        ),
      );
      return;
    }

    setStatus("submitting");
    try {
      const response = await apiPost("/africa/consent/respond", {
        code,
        decision: "ACCEPT",
        dateOfBirth: dateOfBirth.format("YYYY-MM-DD"),
      });
      await Swal.fire({
        icon: response.status === "DOB_MISMATCH" ? "warning" : "success",
        title:
          response.status === "DOB_MISMATCH"
            ? t("Date of birth does not match", "Tarehe ya kuzaliwa haifanani")
            : t("Consent response received", "Majibu ya idhini yamepokelewa"),
        text:
          response.message ||
          t(
            "Your consent response has been recorded.",
            "Jibu lako la idhini limehifadhiwa.",
          ),
        confirmButtonColor: "#DD0201",
      });
      history.push(isAuthenticated ? "/main-dashboard" : "/");
    } catch (requestError) {
      setError(
        t(
          "We could not confirm your date of birth. Check it and try again.",
          "Hatukuweza kuthibitisha tarehe yako ya kuzaliwa. Iangalie na ujaribu tena.",
        ),
      );
      setStatus("idle");
    }
  };

  if (!isAccept && !isDecline) {
    return (
      <Page>
        <Panel>
          <Title>
            {t("Invalid consent link", "Kiungo cha idhini si sahihi")}
          </Title>
          <Copy>
            {t(
              "This consent response link is not valid.",
              "Kiungo hiki cha majibu ya idhini si sahihi.",
            )}
          </Copy>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        {isDecline ? (
          <>
            <Title>{t("Consent declined", "Idhini imekataliwa")}</Title>
            <Copy>
              {t(
                "You have declined this verification consent request. You can always go back and approve the consent if you change your mind.",
                "Umekatiza ombi hili la idhini la uthibitishaji. Unaweza kila wakati kurudi na kukubali idhini ikiwa utabadilisha mawazo yako.",
              )}
            </Copy>
          </>
        ) : status === "complete" ? (
          <>
            <Title>{t("Consent approved", "Idhini imekubaliwa")}</Title>
            <Copy>
              {t(
                "Your date of birth has been confirmed and your consent has been recorded. You can now close this page.",
                "Tarehe yako ya kuzaliwa imethibitishwa na idhini yako imehifadhiwa. Sasa unaweza kufunga ukurasa huu.",
              )}
            </Copy>
            <Copy>
              {t(
                "You can always go back and approve the consent if you change your mind.",
                "Unaweza kila wakati kurudi na kukubali idhini ikiwa utabadilisha mawazo yako.",
              )}
            </Copy>
          </>
        ) : (
          <>
            <Title>{t("Confirm your consent", "Thibitisha idhini yako")}</Title>
            <Copy>
              {t(
                "Enter your date of birth to approve this verification request.",
                "Ingiza tarehe ya kuzaliwa ili kukubali ombi hili la uthibitishaji.",
              )}
            </Copy>
            <Form onSubmit={submitApproval}>
              <label htmlFor="consent-date-of-birth">
                {t("Date of birth", "Tarehe ya kuzaliwa")}
              </label>
              <DatePicker
                id="consent-date-of-birth"
                value={dateOfBirth}
                onChange={setDateOfBirth}
                disabledDate={(date) => date && date > dayjs().endOf("day")}
                format="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                size="large"
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={status === "submitting"}
                size="large"
              >
                {t("Approve consent", "Kubali idhini")}
              </Button>
            </Form>
          </>
        )}
        {error && <Alert message={error} type="error" showIcon />}
      </Panel>
    </Page>
  );
}

export default EmailConsentFeedback;
