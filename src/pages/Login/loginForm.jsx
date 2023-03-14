import React from "react";
import { Checkbox, Space, Col, Row, Divider } from "antd";
import {
  BtnLink,
  Heading,
  MainButtonFull,
  OutlineButtonFull,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";

const LoginForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <Heading>Login</Heading>
      <StyledForm>
        <Row gutter={10}>
          <Col span={12}>
            <OutlineButtonFull type="light">
              <Space size={10}>
                <img
                  src="https://img.icons8.com/color/30/null/google-logo.png"
                  alt="google_logo"
                />
                Continue with Google
              </Space>
            </OutlineButtonFull>
          </Col>
          <Col span={12}>
            <OutlineButtonFull type="light">
              <Space size={10}>
                <img
                  src="https://img.icons8.com/color/30/null/facebook-circled--v1.png"
                  alt="facebook_logo"
                />
                Continue with Google
              </Space>
            </OutlineButtonFull>
          </Col>
        </Row>
        <Divider style={{ color: "#000", borderColor: "#a9b3c1" }}>OR</Divider>
        <StyledLabel>Email address</StyledLabel>
        <StyledInput type="text" placeholder="Enter your email" />
        <StyledLabel>Password</StyledLabel>
        <StyledInput type="text" placeholder="Enter password" />
        <Checkbox onChange={onChange}>Remember me</Checkbox>
        <BtnLink to="/dashboard">
          <MainButtonFull type="primary">Login</MainButtonFull>
        </BtnLink>
        <Subtitle color="light">
          Don’t have an account?{" "}
          <span style={{ color: "#09C93A" }}>Register here</span>
        </Subtitle>
        <Subtitle color="light">
          Forgot password?{" "}
          <span style={{ color: "#09C93A" }}>
            <BtnLink to="/forgot-password">Click me!</BtnLink>
          </span>
        </Subtitle>
      </StyledForm>
    </div>
  );
};

export default LoginForm;
