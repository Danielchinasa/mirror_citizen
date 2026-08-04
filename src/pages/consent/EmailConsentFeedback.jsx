import React, { useEffect, useState } from "react";
import { Alert, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { apiPost } from "../../apiUtils";
import { useLocale } from "../../components/LocaleProvider";

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

const NoteLink = styled(Link)`
  color: var(--ec-primary, #fd7a00);
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: var(--ec-primary-dark, #e06c00);
  }
`;

const getCode = (search) => new URLSearchParams(search).get("code") || "";

function EmailConsentFeedback({ match, location }) {
  const { t } = useLocale();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const action = match.params.action;
  const code = getCode(location.search);
  const isDecline = action === "decline";
  const isAccept = action === "accept";
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

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
      setError(t("consent.email.errorMissingCode"));
      return;
    }

    if (!dateOfBirth) {
      setError(t("consent.email.errorMissingDob"));
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
            ? t("consent.email.dobMismatchTitle")
            : t("consent.email.receivedTitle"),
        text: response.message || t("consent.email.recordedCopy"),
        confirmButtonColor: "#FD7A00",
      });
      history.push(isAuthenticated ? "/main-dashboard" : "/");
    } catch (requestError) {
      setError(t("consent.email.errorConfirmDob"));
      setStatus("idle");
    }
  };

  if (!isAccept && !isDecline) {
    return (
      <Page>
        <Panel>
          <Title>{t("consent.email.invalidTitle")}</Title>
          <Copy>{t("consent.email.invalidCopy")}</Copy>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        {isDecline ? (
          <>
            <Title>{t("consent.email.declinedTitle")}</Title>
            <Copy>{t("consent.email.declinedCopy")}</Copy>
          </>
        ) : status === "complete" ? (
          <>
            <Title>{t("consent.email.approvedTitle")}</Title>
            <Copy>{t("consent.email.recordedCopy")}</Copy>
          </>
        ) : (
          <>
            <Title>{t("consent.email.confirmTitle")}</Title>
            <Copy>{t("consent.email.confirmCopy")}</Copy>
            <Form onSubmit={submitApproval}>
              <label htmlFor="consent-date-of-birth">
                {t("consent.email.dateOfBirth")}
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
                {t("consent.email.approveButton")}
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
