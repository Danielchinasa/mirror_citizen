import React from "react";
import { Col, Row } from "antd";
import {
  CenterText,
  Heading,
  Subtitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  MainButton,
  InfoSec,
  BtnLink,
} from "../../globalStyles";

const SetNewPassword = () => {
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
              <Heading>Set new password</Heading>
              <Subtitle color="light">
                Your new password must be different to previously used passwords
              </Subtitle>
              <StyledForm>
                <StyledLabel>Password</StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your new password"
                />
                <StyledLabel>Confirm password</StyledLabel>
                <StyledInput type="text" placeholder="Confirm password" />
                <BtnLink to="/check-email">
                  <MainButton type="primary">Reset Password</MainButton>
                </BtnLink>
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

export default SetNewPassword;
