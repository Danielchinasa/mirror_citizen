import React from "react";
import { Col, Row } from "antd";
import {
  CenterText,
  FormLabel,
  Heading,
  Input,
  Subtitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  MainButton,
  InfoSec,
} from "../../globalStyles";

const ForgotPassword = () => {
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
              <Heading>Forgot password?</Heading>
              <Subtitle color="light">
                Don’t worry, we’ll send reset instruction
              </Subtitle>
              <StyledForm>
                <StyledLabel>Email</StyledLabel>
                <StyledInput type="text" placeholder="Enter your email" />
                <MainButton type="primary">Reset Password</MainButton>
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

export default ForgotPassword;
