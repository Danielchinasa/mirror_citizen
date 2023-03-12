import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import {
  CenterText,
  Heading,
  InfoSec,
  MainButtonFull,
  StyledForm,
  Subtitle,
} from "../../globalStyles";

const PasswordResetConfirm = () => {
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
              <CheckCircleOutlined
                style={{ fontSize: "92px", color: "#09C93A" }}
              />
              <Heading>Password reset</Heading>
              <Subtitle color="light">
                Your password has been successfully reset, Click below to log in
              </Subtitle>
              <StyledForm>
                <MainButtonFull type="primary">Continue</MainButtonFull>
              </StyledForm>
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

export default PasswordResetConfirm;
