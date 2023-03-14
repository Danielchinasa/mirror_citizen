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

const CheckPasswordResetLink = () => {
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
              <Heading>Check your email</Heading>
              <Subtitle color="light">
                We sent a password reset link to samuel.igboji@biosec.com.ng
              </Subtitle>
              <StyledForm>
                <BtnLink to="/set-new-password">
                  <MainButtonFull type="primary">Check Email</MainButtonFull>
                </BtnLink>
              </StyledForm>
              <Subtitle color="light">
                Didn’t receive an email? Click to resend
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
