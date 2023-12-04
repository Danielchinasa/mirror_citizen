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
          <BtnLink to="/sign-up">
            <span style={{ color: "#09C93A" }}>Register here</span>
          </BtnLink>
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
