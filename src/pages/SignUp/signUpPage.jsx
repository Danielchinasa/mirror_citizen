import React from "react";
import { Col, Row, Image } from "antd";
import reg from "../../images/Verify_NIN_on_ecitizen.jpg";
import SignUpMode from "./signUpMode";
import { theme } from "antd";

const SignUpPage = () => {
  const { token } = theme.useToken(); // Get token from useToken
  const { bgContainer } = token;
  return (
    <Row style={{ backgroundColor: bgContainer }}>
      <Col span={8} sm={0} xs={0} md={8} lg={8}>
        <Image src={reg} preview={false} />
      </Col>
      <Col span={13} sm={24} xs={24} md={13} lg={13}>
        <SignUpMode />
      </Col>
    </Row>
  );
};

export default SignUpPage;
