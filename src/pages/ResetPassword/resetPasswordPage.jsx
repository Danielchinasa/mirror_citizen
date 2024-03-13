import { Col, Row } from "antd";
import React from "react";

import { Img } from "../../globalStyles";
import lady from "../../images/lady.png";
// import ResetPasswordForm from "./resetPasswordForm";
// import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  // const { email } = useParams();
  return (
    <Row>
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
        {/* <ResetPasswordForm email={email} /> */}
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
