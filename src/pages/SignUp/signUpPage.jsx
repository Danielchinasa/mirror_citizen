import React from "react";
import { Col, Row, Image } from "antd";
import reg from "../../images/Verify NIN on ecitizen.jpg";
import SignUpMode from "./signUpMode";

const SignUpPage = () => {
  return (
    <Row>
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
