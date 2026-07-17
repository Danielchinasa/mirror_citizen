import React from "react";
import { Col, Row } from "antd";
import {
  CenterText,
  Heading,
  Subtitle,
  StyledForm,
  MainButtonFull,
  InfoSec,
  BtnLink,
} from "../../globalStyles";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const CheckPasswordResetLink = () => {
  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const { bgContainer, text, text3 } = token;
  return (
    <div>
      <Row justify="center">
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
        <Col
          span={8}
          sm={{
            span: 24,
          }}
          xs={{
            span: 24,
          }}
          md={{
            span: 8,
          }}
          lg={{
            span: 8,
          }}
        >
          <CenterText>
            <InfoSec>
              <Heading $token={token}>Check your email</Heading>
              <Subtitle color="light" $token={token}>
                We sent a password reset link to your email
              </Subtitle>
              <StyledForm>
                <BtnLink to="/set-new-password">
                  <MainButtonFull type="primary">Check Email</MainButtonFull>
                </BtnLink>
              </StyledForm>
              <Subtitle color="light" $token={token}>
                Didn’t receive an email?{" "}
                <strong style={{ color: "#FBCB19" }}>Click to resend</strong>
              </Subtitle>
            </InfoSec>
          </CenterText>
        </Col>
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default CheckPasswordResetLink;
