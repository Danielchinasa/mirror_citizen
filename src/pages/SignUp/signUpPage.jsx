import React from "react";
import { Col, Row } from "antd";
import { Img } from "../../globalStyles";
import mr from "../../images/mr.svg";
import SignUpForm from "./signUpForm";

const SignUpPage = () => {
  return (
    <Row>
      <Col
        span={9}
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 9 }}
        lg={{ span: 9 }}
      >
        <Img src={mr} style={{ maxHeight: "750px" }} />
      </Col>
      <Col
        span={10}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 10 }}
        lg={{ span: 10 }}
      >
        <SignUpForm />
      </Col>
    </Row>
  );
};

export default SignUpPage;
