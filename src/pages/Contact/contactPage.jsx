import React, { useState, useEffect } from "react";
import { Col, Row, Space } from "antd";
import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import {
  Container,
  Heading,
  InfoSec,
  Subtitle,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  MainButtonFull,
} from "../../globalStyles";

import contact from "../../images/contact.png";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const getLanguage = () => {
  if (typeof window === "undefined") return "SW";
  return window.localStorage.getItem("siteLanguage") === "EN" ? "EN" : "SW";
};

const ContactPage = () => {
  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  const [language, setLanguage] = useState(getLanguage);
  const isSw = language === "SW";

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
    <div style={{ backgroundColor: bgContainer }}>
      <Container>
        <InfoSec>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              color: text,
            }}
          >
            <h1 style={{ color: text }}>
              {isSw ? "Wasiliana nasi" : "Contact Us"}
            </h1>
            <p>
              {isSw ? "Barua pepe yetu:" : "Our Email Address:"}{" "}
              <a href="mailto:ke-info@e-raia.com">ke-info@e-raia.com</a>
            </p>
            <p>
              {isSw
                ? "Jisikie huru kututumia barua pepe kwa maswali yoyote au maoni."
                : "Feel free to reach out to us via email for any inquiries or feedback."}
            </p>
          </div>
        </InfoSec>
      </Container>
    </div>
  );
};

export default ContactPage;
