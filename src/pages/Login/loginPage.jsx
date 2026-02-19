import { Col, Row } from "antd";
import React from "react";

import { trackGA4Event } from "../../hooks/analytics";
import { Img } from "../../globalStyles";
import lady from "../../images/check_credit_scores_on_ecitizen.png";
import LoginForm from "./loginForm";
import { useTheme } from "../../components/ThemeProvider";
import { theme } from "antd";

const LoginPage = () => {
  const { isDark } = useTheme();

  // Get the useToken hook from antd
  const { token } = theme.useToken(); // Get token from useToken
  const { bgContainer } = token;

  return (
    <Row style={{ backgroundColor: bgContainer }}>
      <Col
        span={8}
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 8 }}
        lg={{ span: 8 }}
      >
        <Img src={lady} />
      </Col>
      <Col
        span={10}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 10 }}
        lg={{ span: 10 }}
      >
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
