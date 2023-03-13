import React from "react";
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
  Switch,
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

const SignUpForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <Row justify="space-between">
        <Col span={20}>
          {" "}
          <Heading>Create Account </Heading>
        </Col>
        <Col span={4}>
          <Switch
            checkedChildren="Personal"
            unCheckedChildren="Business"
            style={{ maxWidth: "100px", marginTop: "15px" }}
          />
        </Col>
      </Row>
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
        <StyledLabel>Full name</StyledLabel>
        <StyledInput type="text" placeholder="Enter your full name" />
        <StyledLabel>Email address</StyledLabel>
        <StyledInput type="text" placeholder="Enter your email address" />
        <StyledLabel>Phone number</StyledLabel>
        <StyledInput type="text" placeholder="Enter your phone number" />
        <StyledLabel>Password</StyledLabel>
        <StyledInput type="text" placeholder="Enter password" />
        <Checkbox onChange={onChange}>
          I certify that I have read and accepted the e-citizen Privacy Policy
          and Terms of Service
        </Checkbox>
        <BtnLink to="/check-email">
          <MainButtonFull type="primary">Create Account</MainButtonFull>
        </BtnLink>
        <Subtitle color="light">
          Already have an account?
          <span style={{ color: "#09C93A" }}> Login</span>
        </Subtitle>
      </StyledForm>
    </div>
  );
};

export default SignUpForm;
