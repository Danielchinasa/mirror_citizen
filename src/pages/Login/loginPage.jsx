import React from "react";
import { Col, Row, Image } from "antd";

import lady from "../../images/lady.svg";
import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <Row>
      <Col span={7}>
        <Image src={lady} />
      </Col>
      <Col span={9} offset={2}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
