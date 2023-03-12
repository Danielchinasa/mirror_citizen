import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Col,
  Image,
  Row,
  Divider,
} from "antd";
import {
  BtnLink,
  Heading,
  Img,
  InfoSec,
  MainButtonFull,
  OutlineButtonFull,
  StyledForm,
  StyledInput,
  StyledLabel,
  Subtitle,
} from "../../globalStyles";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";

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
                <img src="https://img.icons8.com/color/30/null/google-logo.png" />
                Continue with Google
              </Space>
            </OutlineButtonFull>
          </Col>
          <Col span={12}>
            <OutlineButtonFull type="light">
              <Space size={10}>
                <img src="https://img.icons8.com/color/30/null/facebook-circled--v1.png" />
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
        <BtnLink to="/check-email">
          <MainButtonFull type="primary">Reset Password</MainButtonFull>
        </BtnLink>
        <Subtitle color="light">
          Don’t have an account?{" "}
          <span style={{ color: "#09C93A" }}>Register here</span>
        </Subtitle>
        <Subtitle color="light">
          Forgot password? <span style={{ color: "#09C93A" }}>Click me!</span>
        </Subtitle>
      </StyledForm>
    </div>
  );
};

export default LoginForm;
