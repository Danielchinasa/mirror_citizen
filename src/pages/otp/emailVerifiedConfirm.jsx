import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import React from "react";
import {
  BtnLink,
  CenterText,
  Heading,
  InfoSec,
  MainButtonFull,
  StyledForm,
  Subtitle,
} from "../../globalStyles";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
const { Title } = Typography;

const EmailVerifiedConfirm = () => {
  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const { bgContainer, text, text3 } = token;
  return (
    <div>
      <Row justify="center">
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
        <Col
          span={8}
          sm={{
            span: 24,
          }}
          xs={{
            span: 24,
          }}
          md={{
            span: 8,
          }}
          lg={{
            span: 8,
          }}
        >
          <CenterText>
            <InfoSec>
              <CheckCircleOutlined
                style={{ fontSize: "92px", color: "#02831C" }}
              />
              <Title>Email verified successfully</Title>
              <Subtitle color="light" $token={token}>
                Congratulations! Your email has been successfully verified. You
                can now enjoy full access to all the features and benefits of
                our platform.
              </Subtitle>
            </InfoSec>
          </CenterText>
        </Col>
        <Col
          span={4}
          sm={{
            span: 0,
          }}
          xs={{
            span: 0,
          }}
          md={{
            span: 4,
          }}
          lg={{
            span: 4,
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default EmailVerifiedConfirm;
