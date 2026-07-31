import React, { useState } from "react";
import { Alert, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
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

function EmailConsentFeedback({ match, location }) {
  const action = match.params.action;
  const code = getCode(location.search);
  const isDecline = action === "decline";
  const isAccept = action === "accept";
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submitApproval = async (event) => {
    event.preventDefault();
    setError("");

    if (!code) {
      setError("This consent link is missing its consent code.");
      return;
    }

    if (!dateOfBirth) {
      setError("Enter your date of birth to approve this consent request.");
      return;
    }

    setStatus("submitting");
    try {
      await apiPost("/verification/consent-response", {
        code,
        decision: "approved",
        dateOfBirth: dateOfBirth.format("YYYY-MM-DD"),
      });
      setStatus("complete");
    } catch (requestError) {
      setError(
        "We could not confirm your date of birth. Check it and try again.",
      );
      setStatus("idle");
    }
  };

  if (!isAccept && !isDecline) {
    return (
      <Page>
        <Panel>
          <Title>Invalid consent link</Title>
          <Copy>This consent response link is not valid.</Copy>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        {isDecline ? (
          <>
            <Title>Consent declined</Title>
            <Copy>
              You have declined this verification consent request.
              {code && (
                <>
                  {" "}
                  Consent code: <Code>{code}</Code>.
                </>
              )}
            </Copy>
          </>
        ) : status === "complete" ? (
          <>
            <Title>Consent approved</Title>
            <Copy>
              Your date of birth has been confirmed and your consent has been
              recorded. You can now close this page.
            </Copy>
          </>
        ) : (
          <>
            <Title>Confirm your consent</Title>
            <Copy>
              Enter your date of birth to approve this verification request.
              {code && (
                <>
                  {" "}
                  Consent code: <Code>{code}</Code>.
                </>
              )}
            </Copy>
            <Form onSubmit={submitApproval}>
              <label htmlFor="consent-date-of-birth">Date of birth</label>
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
                Approve consent
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
