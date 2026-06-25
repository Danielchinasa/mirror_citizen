import React from "react";
import { Col, Row, Space } from "antd";
import { MailOutlined, PhoneFilled } from "@ant-design/icons";
import {
  Container,
  Heading,
  InfoSec,
  Subtitle,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  MainButtonFull,
} from "../../globalStyles";

import contact from "../../images/contact.png";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const ContactPage = () => {
  const { token } = theme.useToken();
  const { bgContainer, text } = token;
  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container>
        <InfoSec>
          {/* <Row>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
           
            <img src={contact} />
            <Row>
              <Col>
                <Space direction="horizontal" size={10}>
                  <MailOutlined
                    style={{
                      fontSize: "22px",
                      color: "#DD0201",
                    }}
                  />
                  <h5> info@e-citizen.ng</h5>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Space direction="horizontal" size={10}></Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Space direction="horizontal" size={10}></Space>
              </Col>
            </Row>
          </Col>
          <Col
            span={12}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <StyledForm>
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your name
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Full name" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your email address
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Email address" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Your phone number
                </Space>
              </StyledLabel>
              <StyledInput placeholder="Phone number" />
              <StyledLabel>Your subject</StyledLabel>
              <StyledInput placeholder="Subject" />
              <StyledLabel>
                <Space direction="horizontal" size={5}>
                  <span style={{ color: "red" }}>*</span>Message
                </Space>
              </StyledLabel>
              <StyledTextArea placeholder="Message" rows={4} />
              <MainButtonFull type="primary">Send</MainButtonFull>
            </StyledForm>
          </Col>
        </Row> */}
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              color: text,
            }}
          >
            <h1 style={{ color: text }}>Contact Us</h1>
            <p>
              Our Email Address:{" "}
              <a href="mailto:info@e-citizen.ng">info@e-citizen.ng</a>
            </p>
            <p>
              Feel free to reach out to us via email for any inquiries or
              feedback.
            </p>
          </div>
        </InfoSec>
      </Container>
    </div>
  );
};

export default ContactPage;
