import React, { useState, useEffect } from "react";
import { Container, Heading, Subtitle, InfoSec } from "../../globalStyles";
import { useTheme } from "../../components/ThemeProvider";
import { theme } from "antd";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const AccountDeletionPage = () => {
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";
  const { isDark } = useTheme();
  const { token } = theme.useToken();

  useEffect(() => {
    const onLanguageChange = () => setLanguage(getLanguage());
    window.addEventListener("siteLanguageChanged", onLanguageChange);
    window.addEventListener("storage", onLanguageChange);
    return () => {
      window.removeEventListener("siteLanguageChanged", onLanguageChange);
      window.removeEventListener("storage", onLanguageChange);
    };
  }, []);

  return (
    <InfoSec lightBg={!isDark} style={{ minHeight: "70vh" }}>
      <Container>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <Heading lightText={isDark} $token={token}>
            {isSw ? "Ufutaji wa Akaunti" : "Account Deletion"}
          </Heading>

          {isSw ? (
            <div
              style={{
                color: isDark ? "#fff" : "#1c2237",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              <p>
                Tunaheshimu haki yako ya kudhibiti data yako binafsi na akaunti
                yako. Ikiwa ungependa kufuta akaunti yako ya e-raia Kenya na
                data zinazohusiana, tafadhali fuata hatua hizi:
              </p>

              <ul
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <li style={{ marginBottom: "10px" }}>
                  Tuma barua pepe kwa <strong>ke-info@e-raia.com</strong>.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Tumia anwani ya barua pepe inayohusishwa na akaunti yako.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Weka "Ombi la Kufuta Akaunti" kama kichwa cha barua pepe.
                </li>
                <li>
                  Tafadhali weka maelezo ya kutosha ili kuthibitisha utambulisho
                  wako na kutusaidia kupata akaunti yako.
                </li>
              </ul>

              <p>
                Tutathibitisha utambulisho wako kwa kiwango kinachofaa na
                kushughulikia ombi lako ndani ya muda wa kisheria uliowekwa.
              </p>
              <p style={{ marginTop: "15px", fontStyle: "italic" }}>
                Kumbuka: Kufuta akaunti kunaweza kusababisha kupoteza uwezo wa
                kufikia huduma fulani na historia yako ya uthibitishaji kwenye
                jukwaa letu. Baadhi ya data inaweza kuhifadhiwa kama
                inavyotakiwa na sheria au kwa madhumuni halali ya kibiashara
                kama inavyoelezwa kwenye Sera yetu ya Faragha.
              </p>
            </div>
          ) : (
            <div
              style={{
                color: isDark ? "#fff" : "#1c2237",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              <p>
                We respect your right to control your personal data and account.
                If you wish to delete your e-raia Kenya account and associated
                data, please follow these steps:
              </p>

              <ul
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <li style={{ marginBottom: "10px" }}>
                  Send an email to <strong>ke-info@e-raia.com</strong>.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Use the email address associated with your account.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Use "Account Deletion Request" as the subject of the email.
                </li>
                <li>
                  Please include sufficient details to verify your identity and
                  help us locate your account.
                </li>
              </ul>

              <p>
                We will verify your identity proportionately and process your
                request within the period required by applicable law.
              </p>
              <p style={{ marginTop: "15px", fontStyle: "italic" }}>
                Note: Deleting your account may result in the loss of access to
                certain services and your verification history on our platform.
                Some data may be retained as required by law or for legitimate
                business purposes as outlined in our Privacy Policy.
              </p>
            </div>
          )}
        </div>
      </Container>
    </InfoSec>
  );
};

export default AccountDeletionPage;
